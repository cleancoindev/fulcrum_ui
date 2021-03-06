import { BigNumber } from '@0x/utils'
import Asset from 'bzx-common/src/assets/Asset'

import { RequestTask } from '../../domain/RequestTask'
import { RolloverRequest } from '../../domain/RolloverRequest'

import { FulcrumProvider } from '../FulcrumProvider'

export class RolloverProcessor {
  public run = async (task: RequestTask, account: string, skipGas: boolean) => {
    if (
      !(
        FulcrumProvider.Instance.contractsSource &&
        FulcrumProvider.Instance.contractsSource.canWrite
      )
    ) {
      throw new Error('No provider available!')
    }

    // Initializing loan
    const taskRequest: RolloverRequest = task.request as RolloverRequest
    task.processingStart([
      'Initializing',
      'Submitting transaction',
      'Updating the blockchain',
      'Transaction completed'
    ])

    // Initializing loan
    const iBZxContract = await FulcrumProvider.Instance.contractsSource.getiBZxContract()

    if (!iBZxContract) {
      throw new Error('No bzxContract contract available!')
    }

    // Submitting txn
    task.processingStepNext()

    let gasAmountBN = new BigNumber(FulcrumProvider.Instance.gasLimit)
    let txHash: string = ''
    const isGasTokenEnabled = localStorage.getItem('isGasTokenEnabled') === 'true'
    const chiTokenBalance = await FulcrumProvider.Instance.getAssetTokenBalanceOfUser(Asset.CHI)

    const loanData = '0x'
    try {
      const gasAmount =
        isGasTokenEnabled && chiTokenBalance.gt(0)
          ? await iBZxContract.rolloverWithGasToken.estimateGasAsync(
              taskRequest.loanId,
              account,
              loanData,
              {
                from: account,
                gas: FulcrumProvider.Instance.gasLimit
              }
            )
          : await iBZxContract.rollover.estimateGasAsync(taskRequest.loanId, loanData, {
              from: account,
              gas: FulcrumProvider.Instance.gasLimit
            })
      gasAmountBN = new BigNumber(gasAmount)
        .multipliedBy(FulcrumProvider.Instance.gasBufferCoeff)
        .integerValue(BigNumber.ROUND_UP)
    } catch (e) {
      throw e
    }

    try {
      txHash =
        isGasTokenEnabled && chiTokenBalance.gt(0)
          ? await iBZxContract.rolloverWithGasToken.sendTransactionAsync(
              taskRequest.loanId,
              account,
              loanData,
              {
                from: account,
                gas: gasAmountBN.toString(),
                gasPrice: await FulcrumProvider.Instance.gasPrice()
              }
            )
          : await iBZxContract.rollover.sendTransactionAsync(taskRequest.loanId, loanData, {
              from: account,
              gas: gasAmountBN.toString(),
              gasPrice: await FulcrumProvider.Instance.gasPrice()
            })

      task.setTxHash(txHash)
    } catch (e) {
      throw e
    }

    task.processingStepNext()
    const txReceipt = await FulcrumProvider.Instance.waitForTransactionMined(txHash)
    if (!txReceipt.status) {
      throw new Error('Reverted by EVM')
    }

    task.processingStepNext()
    await FulcrumProvider.Instance.sleep(FulcrumProvider.Instance.successDisplayTimeout)
  }
}
