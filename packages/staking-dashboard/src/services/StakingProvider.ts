import { BigNumber } from '@0x/utils'
import { TransactionReceipt, Web3Wrapper, LogEntry } from '@0x/web3-wrapper'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorEvent, ConnectorUpdate } from '@web3-react/types'
import hashUtils from 'app-lib/hashUtils'
import GovernanceProposal, {
  GovernanceProposalHistoryItem,
  GovernanceProposalStates
} from 'src/domain/GovernanceProposal'
import ProposalCreated from 'src/domain/ProposalCreated'
import { TypedEmitter } from 'tiny-typed-emitter'
import appConfig from '../config/appConfig'
import Asset from '../domain/Asset'
import AssetsDictionary from '../domain/AssetsDictionary'
import ProviderType from '../domain/ProviderType'
import ProviderTypeDictionary from '../domain/ProviderTypeDictionary'
import RequestTask from '../domain/RequestTask'
import Web3ConnectionFactory from '../domain/Web3ConnectionFactory'
import ContractsSource from './ContractsSource'
import ProviderChangedEvent from './events/ProviderChangedEvent'
import { stakeableToken } from 'src/domain/stakingTypes'
import { EventAbi, LogWithDecodedArgs, DecodedLogArgs } from 'ethereum-types'
import {
  CompoundGovernorAlphaEventArgs,
  CompoundGovernorAlphaProposalCanceledEventArgs,
  CompoundGovernorAlphaProposalCreatedEventArgs,
  CompoundGovernorAlphaProposalExecutedEventArgs,
  CompoundGovernorAlphaProposalQueuedEventArgs,
  CompoundGovernorAlphaVoteCastEventArgs
} from '../contracts/CompoundGovernorAlpha'

interface IStakingProviderEvents {
  ProviderAvailable: () => void
  ProviderChanged: (event: ProviderChangedEvent) => void
  ProviderIsChanging: () => void
  TaskChanged: (task: RequestTask) => void
  TaskUpdate: (event: {
    opId: string
    opType?: 'staking'
    type: 'txhash' | 'created'
    value?: any
    time?: number
  }) => void
  TransactionMined: () => void
  AskToOpenProgressDlg: (task: RequestTask) => void
  AskToCloseProgressDlg: (task: RequestTask) => void
}

export class StakingProvider extends TypedEmitter<IStakingProviderEvents> {
  public static Instance: StakingProvider

  public readonly gasLimit = '500000'

  // gasBufferCoeff equal 110% gas reserve
  public readonly gasBufferCoeff = new BigNumber('1.1')
  // 5000ms
  public readonly successDisplayTimeout = 5000
  public providerType: ProviderType = ProviderType.None
  public providerEngine: any = null
  public web3Wrapper: Web3Wrapper | null = null
  public contractsSource: ContractsSource | null = null
  public accounts: string[] = []
  public unsupportedNetwork: boolean = false
  public impersonateAddress = ''
  private requestTask: RequestTask | undefined

  public readonly UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1)

  constructor() {
    super()
    // init
    this.setMaxListeners(1000)

    // TasksQueue.Instance.on(TasksQueueEvents.Enqueued, this.onTaskEnqueued);
  }

  public getLocalstorageItem(item: string): string {
    let response = ''
    response = localStorage.getItem(item) || ''
    return response
  }

  public setLocalstorageItem(item: string, val: string) {
    localStorage.setItem(item, val)
  }

  public getCurrentAccount(): string | undefined {
    return this.impersonateAddress
      ? this.impersonateAddress
      : this.accounts.length > 0 && this.accounts[0]
      ? this.accounts[0].toLowerCase()
      : undefined
  }

  public setWeb3Provider = async (connector: AbstractConnector, account?: string) => {
    this.unsupportedNetwork = false
    this.emit('ProviderIsChanging')
    const providerType = await ProviderTypeDictionary.getProviderTypeByConnector(connector)
    await Web3ConnectionFactory.setWalletProvider(connector, providerType, account)
    await this.setWeb3ProviderFinalize(providerType)
  }

  public getLibrary = async (provider: any, connector: any): Promise<any> => {
    // handle connectors events (i.e. network changed)
    await this.setWeb3Provider(connector)
    if (!connector.listeners(ConnectorEvent.Update).includes(this.onConnectorUpdated)) {
      connector.on(ConnectorEvent.Update, this.onConnectorUpdated)
    }
    return Web3ConnectionFactory.currentWeb3Engine
  }

  public onConnectorUpdated = async (update: ConnectorUpdate) => {
    this.emit('ProviderIsChanging')
    Web3ConnectionFactory.updateConnector(update)
    await this.setWeb3ProviderFinalize(this.providerType)
  }

  public async setReadonlyWeb3Provider() {
    this.emit('ProviderIsChanging')
    await Web3ConnectionFactory.setReadonlyProvider()
    await this.setWeb3ProviderFinalize(ProviderType.None)
  }

  public async setWeb3ProviderFinalize(providerType: ProviderType) {
    this.web3Wrapper = Web3ConnectionFactory.currentWeb3Wrapper
    this.providerEngine = Web3ConnectionFactory.currentWeb3Engine
    let canWrite = Web3ConnectionFactory.canWrite
    const networkId = Web3ConnectionFactory.networkId
    this.accounts = Web3ConnectionFactory.userAccount ? [Web3ConnectionFactory.userAccount] : []

    if (this.web3Wrapper && networkId !== appConfig.appNetworkId) {
      // TODO: inform the user they are on the wrong network. Make it provider specific (MetaMask, etc)
      this.unsupportedNetwork = true
      canWrite = false // revert back to read-only
    }

    if (this.web3Wrapper && canWrite) {
      const web3EngineAccounts = await this.web3Wrapper.getAvailableAddressesAsync()
      if (web3EngineAccounts.length > 0 && this.accounts.length === 0) {
        this.accounts = web3EngineAccounts
      }
      if (this.accounts.length === 0) {
        canWrite = false // revert back to read-only
      }
    }

    if (this.web3Wrapper && appConfig.web3ProviderSettings.networkId > 0) {
      const newContractsSource = new ContractsSource(
        this.providerEngine,
        appConfig.web3ProviderSettings.networkId,
        canWrite
      )
      this.contractsSource = newContractsSource
      this.contractsSource.getStakingV1Contract().catch((err) => console.error(err))
    } else {
      this.contractsSource = null
    }

    this.providerType = canWrite ? providerType : ProviderType.None
    this.emit('ProviderChanged', new ProviderChangedEvent(this.providerType, this.web3Wrapper))
    this.setLocalstorageItem('providerType', this.providerType)
  }

  public async preloadIBZXContract() {
    if (this.contractsSource) {
      return this.contractsSource.getiBZxContract()
    }
  }

  public getErc20AddressOfAsset(asset: keyof typeof Asset): string | null {
    const assetDetails = AssetsDictionary.getAsset(asset)
    if (assetDetails) {
      return assetDetails.addressErc20.get(appConfig.web3ProviderSettings.networkId) || ''
    }
    return null
  }

  /**
   * Helper to know the spending allowance of a contract for a particular token
   * The account checked is the current active one
   */
  public async checkErc20Allowance(asset: keyof typeof Asset, contractAddress: string) {
    const erc20Address = this.getErc20AddressOfAsset(asset)
    const account = this.getCurrentAccount()

    if (!account || !erc20Address || !this.contractsSource) {
      throw new Error('Missing account, erc20address, contract source')
    }

    const erc20Contract = await this.contractsSource.getErc20Contract(erc20Address)
    const result = await erc20Contract.allowance.callAsync(account, contractAddress)

    return result
  }

  /**
   * Check if the staking contract can spend user token
   * This must be called for all assets
   */
  public async checkStakingErc20Allowance(asset: keyof typeof Asset) {
    if (!this.contractsSource) {
      throw new Error('Missing contract source')
    }
    const stakingAddress = this.contractsSource.getStakingV1Address()
    return this.checkErc20Allowance(asset, stakingAddress)
  }

  /**
   * Set the spending allowance of tokens by the staking contract (so that user can stake)
   * This is expected to be called for bzrx, vbzrx, ibzrx and/or bpt
   */
  public async setStakingAllowance(asset: keyof typeof Asset, amount: BigNumber) {
    const erc20Address = this.getErc20AddressOfAsset(asset)
    const account = this.getCurrentAccount()

    if (!erc20Address || !account || !this.contractsSource) {
      throw new Error('setStakingAllowance: Missing account, erc20address or contract source')
    }
    const erc20Contract = await this.contractsSource.getErc20Contract(erc20Address)
    const stakingAddress = this.contractsSource.getStakingV1Address()

    const txHash = await erc20Contract.approve.sendTransactionAsync(stakingAddress, amount, {
      from: account
    })

    return this.waitForTransactionMined(txHash)
  }

  /**
   * Amount of vBZRX that have vested held in the user wallet
   */
  public async getGovernanceProposals(): Promise<Array<GovernanceProposal>> {
    let result: Array<GovernanceProposal> = []

    let proposalCreatedEvents: Array<
      LogWithDecodedArgs<CompoundGovernorAlphaProposalCreatedEventArgs>
    > = []
    let proposalQueuedEvents: Array<
      LogWithDecodedArgs<CompoundGovernorAlphaProposalQueuedEventArgs>
    > = []
    let proposalExecutedEvents: Array<
      LogWithDecodedArgs<CompoundGovernorAlphaProposalExecutedEventArgs>
    > = []
    let proposalCanceledEvents: Array<
      LogWithDecodedArgs<CompoundGovernorAlphaProposalCanceledEventArgs>
    > = []
    let proposalVoteCastEvents: Array<
      LogWithDecodedArgs<CompoundGovernorAlphaVoteCastEventArgs>
    > = []
    let proposalsData = []
    let proposalsStates: BigNumber[] = []

    const enumerateProposalState = (state: number) => {
      const proposalStates = [
        'Pending',
        'Active',
        'Canceled',
        'Defeated',
        'Succeeded',
        'Queued',
        'Expired',
        'Executed'
      ]
      return proposalStates[state]
    }

    if (!this.web3Wrapper || !this.contractsSource) {
      throw new Error('getGovernanceProposals: Missing source or web3')
    }

    const governanceContract = this.contractsSource.getCompoundGovernorAlphaContract()
    this.web3Wrapper.abiDecoder.addABI(governanceContract.abi)
    const proposalsCount = await governanceContract.proposalCount.callAsync()
    const quorumVotes = await governanceContract.quorumVotes.callAsync()
    const votingPeriod = await governanceContract.votingPeriod.callAsync()
    const currentBlock = await this.web3Wrapper.getBlockNumberAsync()

    const voteCastEvents = await this.web3Wrapper.getLogsAsync({
      fromBlock: '0x895440', //9000000
      toBlock: 'latest',
      topics: ['0x877856338e13f63d0c36822ff0ef736b80934cd90574a3a5bc9262c39d217c46'],
      address: this.contractsSource.getCompoundGovernorAlphaAddress()
    })
    for (const i in voteCastEvents) {
      if (!voteCastEvents[i]) {
        continue
      }
      const event: LogEntry = voteCastEvents[i]
      const decodedData = this.web3Wrapper.abiDecoder.tryToDecodeLogOrNoop<
        CompoundGovernorAlphaVoteCastEventArgs
      >(event)
      if ('args' in decodedData) {
        proposalVoteCastEvents.push(decodedData)
      } else {
        console.warn({ decodedData })
      }
    }

    const createdEvents = await this.web3Wrapper.getLogsAsync({
      fromBlock: '0x895440', //9000000
      toBlock: 'latest',
      topics: [ProposalCreated.topic0],
      address: this.contractsSource.getCompoundGovernorAlphaAddress()
    })
    for (const i in createdEvents) {
      if (!createdEvents[i]) {
        continue
      }
      const event: LogEntry = createdEvents[i]
      const decodedData = this.web3Wrapper.abiDecoder.tryToDecodeLogOrNoop<
        CompoundGovernorAlphaProposalCreatedEventArgs
      >(event)
      if ('args' in decodedData) {
        proposalCreatedEvents.push(decodedData)
      } else {
        console.warn({ decodedData })
      }
    }

    const queuedEvents = await this.web3Wrapper.getLogsAsync({
      fromBlock: '0x895440', //9000000
      toBlock: 'latest',
      topics: ['0x9a2e42fd6722813d69113e7d0079d3d940171428df7373df9c7f7617cfda2892'],
      address: this.contractsSource.getCompoundGovernorAlphaAddress()
    })
    for (const i in queuedEvents) {
      if (!createdEvents[i]) {
        continue
      }
      const event: LogEntry = queuedEvents[i]
      const decodedData = this.web3Wrapper.abiDecoder.tryToDecodeLogOrNoop<
        CompoundGovernorAlphaProposalQueuedEventArgs
      >(event)
      if ('args' in decodedData) {
        proposalQueuedEvents.push(decodedData)
      } else {
        console.warn({ decodedData })
      }
    }

    const executedEvents = await this.web3Wrapper.getLogsAsync({
      fromBlock: '0x895440', //9000000
      toBlock: 'latest',
      topics: ['0x712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f'],
      address: this.contractsSource.getCompoundGovernorAlphaAddress()
    })
    for (const i in executedEvents) {
      if (!createdEvents[i]) {
        continue
      }
      const event: LogEntry = executedEvents[i]
      const decodedData = this.web3Wrapper.abiDecoder.tryToDecodeLogOrNoop<
        CompoundGovernorAlphaProposalExecutedEventArgs
      >(event)
      if ('args' in decodedData) {
        proposalExecutedEvents.push(decodedData)
      } else {
        console.warn({ decodedData })
      }
    }
    const canceledEvents = await this.web3Wrapper.getLogsAsync({
      fromBlock: '0x895440', //9000000
      toBlock: 'latest',
      topics: ['0x789cf55be980739dad1d0699b93b58e806b51c9d96619bfa8fe0a28abaa7b30c'],
      address: this.contractsSource.getCompoundGovernorAlphaAddress()
    })
    for (const i in canceledEvents) {
      if (!createdEvents[i]) {
        continue
      }
      const event: LogEntry = canceledEvents[i]
      const decodedData = this.web3Wrapper.abiDecoder.tryToDecodeLogOrNoop<
        CompoundGovernorAlphaProposalCanceledEventArgs
      >(event)
      if ('args' in decodedData) {
        proposalCanceledEvents.push(decodedData)
      } else {
        console.warn({ decodedData })
      }
    }

    for (const i of Array.from(Array(parseInt(proposalsCount.toFixed())), (n, i) => i + 1)) {
      proposalsData.push(await governanceContract.proposals.callAsync(new BigNumber(i)))
      proposalsStates.push(
        new BigNumber(await governanceContract.state.callAsync(new BigNumber(i)))
      )
    }
    const remappedProposals = []
    for (const i in proposalsData) {
      const p = proposalsData[i]
      const id = p[0].toNumber()
      const creationEvent = proposalCreatedEvents.find((e) => e.args.id.eq(id))
      if (creationEvent === undefined) {
        continue
      }
      const queuedEvent = proposalQueuedEvents.find((e) => e.args.id.eq(id))
      const executedEvent = proposalExecutedEvents.find((e) => e.args.id.eq(id))
      const canceledEvent = proposalCanceledEvents.find((e) => e.args.id.eq(id))
      const voteCasts = proposalVoteCastEvents.filter(
        (e) => e.args.proposalId.eq(id) && e.args.support === true
      )
      // let votesAccumulator = new BigNumber(0)
      // voteCasts.some( vote => {
      //   votesAccumulator = votesAccumulator.plus(vote.args.votes)
      //   if (votesAccumulator.gt(quorumVotes)){
      //     console.log(id, vote.blockNumber!.toFixed())
      //     return true
      //   }
      //   return false
      // })

      const splittedDescription = creationEvent.args.description.split(/\n/g)
      const title = splittedDescription[0].split('# ')[1] || 'Untitled'
      splittedDescription.splice(0, 1)
      const description = splittedDescription.join('\n') || 'No description.'

      const pendingHistoryItem = {
        state: GovernanceProposalStates.Pending,
        blockNumber: p[3].toNumber(),
        txnHash: creationEvent.transactionHash,
        date: await this.web3Wrapper!.getBlockTimestampAsync(creationEvent.blockNumber!)
      } as GovernanceProposalHistoryItem
      const activeHistoryItem = {
        state: GovernanceProposalStates.Active,
        blockNumber: p[3].toNumber(),
        txnHash: creationEvent.transactionHash,
        date: await this.web3Wrapper!.getBlockTimestampAsync(creationEvent.blockNumber!)
      } as GovernanceProposalHistoryItem
      const voteResultHisoryItem = {
        state:
          p[4].lt(currentBlock) && p[2].isZero()
            ? GovernanceProposalStates.Defeated
            : GovernanceProposalStates.Succeeded,
        blockNumber: p[4].toNumber(),
        date: await this.web3Wrapper!.getBlockTimestampAsync(p[4].toNumber())
      } as GovernanceProposalHistoryItem

      const queuedHisoryItem =
        (queuedEvent &&
          ({
            state: GovernanceProposalStates.Queued,
            blockNumber: queuedEvent.blockNumber!,
            txnHash: queuedEvent.transactionHash,
            date: await this.web3Wrapper!.getBlockTimestampAsync(queuedEvent.blockNumber!)
          } as GovernanceProposalHistoryItem)) ||
        undefined

      const executedHisoryItem =
        (executedEvent &&
          ({
            state: GovernanceProposalStates.Executed,
            blockNumber: executedEvent.blockNumber!,
            txnHash: executedEvent.transactionHash,
            date: await this.web3Wrapper!.getBlockTimestampAsync(executedEvent.blockNumber!)
          } as GovernanceProposalHistoryItem)) ||
        undefined

      const expiredHisoryItem =
        (queuedEvent &&
          p[2].plus(1209600).lt(currentBlock) &&
          ({
            state: GovernanceProposalStates.Expired,
            blockNumber: p[2].plus(1209600).toNumber(),
            date: await this.web3Wrapper!.getBlockTimestampAsync(p[2].plus(1209600).toNumber())
          } as GovernanceProposalHistoryItem)) ||
        undefined

      const canceledHisoryItem =
        (canceledEvent &&
          ({
            state: GovernanceProposalStates.Canceled,
            blockNumber: canceledEvent.blockNumber!,
            txnHash: canceledEvent.transactionHash
          } as GovernanceProposalHistoryItem)) ||
        undefined

      const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue => {
        return value !== null && value !== undefined
      }
      const history: Array<GovernanceProposalHistoryItem> = [
        pendingHistoryItem,
        activeHistoryItem,
        voteResultHisoryItem,
        queuedHisoryItem,
        executedHisoryItem,
        expiredHisoryItem,
        canceledHisoryItem
      ].filter(notEmpty)

      remappedProposals.push(
        new GovernanceProposal(
          id,
          title,
          description,
          creationEvent.args.proposer,
          p[5].div(10 ** 18),
          p[6].div(10 ** 18),
          GovernanceProposalStates[proposalsStates[id - 1].toNumber()],
          p,
          creationEvent,
          queuedEvent,
          executedEvent,
          canceledEvent,
          voteCasts,
          history
        )
      )
    }
    result = remappedProposals.reverse()
    console.log({ result })
    return result
  }

  public async getVestedBzrxBalance() {
    const account = this.getCurrentAccount()

    if (!this.contractsSource || !account) {
      throw new Error('Missing contract source or account')
    }

    const vbzrxContract = await this.contractsSource.getBzrxVestingContract()

    return vbzrxContract.vestedBalanceOf.callAsync(account)
  }

  /**
   * Mostly for users who hold vbzrx in their wallet and just want to claim their bzrx
   */
  public async claimVestedBZRX() {
    const account = this.getCurrentAccount()

    if (!this.contractsSource || !account) {
      throw new Error('Missing contract source or account')
    }

    const vbzrxContract = await this.contractsSource.getBzrxVestingContract()

    const { gasAmount } = await this.getGasEstimate(() =>
      vbzrxContract.claim.estimateGasAsync({
        from: account
      })
    )

    const txHash = await vbzrxContract.claim.sendTransactionAsync({
      from: account,
      gas: gasAmount,
      gasPrice: await this.gasPrice()
    })

    await this.waitForTransactionMined(txHash)
  }

  /**
   * Staking contract may not be available
   * TODO: Check if staking contract may really not be available. This check might not be needed
   */
  public async getStakingContract() {
    if (!this.contractsSource) {
      return null
    }

    const stakingContract = await this.contractsSource.getStakingV1Contract()

    if (!stakingContract) {
      return null
    }

    return stakingContract
  }

  /**
   * Returns the amount of staked tokens of a user.
   *
   * The amounts are in base units so they must be divided by 10 ** decimals
   * @param address the wallet of the user
   */
  public async getStakedBalances(address: string) {
    const stakingContract = await this.getStakingContract()
    if (!stakingContract) {
      return {
        bzrx: new BigNumber(0),
        vbzrx: new BigNumber(0),
        ibzrx: new BigNumber(0),
        bpt: new BigNumber(0)
      }
    }
    const [bzrx, ibzrx, vbzrx, bpt] = await stakingContract.balanceOfByAssets.callAsync(address)
    return { bzrx, ibzrx, vbzrx, bpt }
  }

  public gasPrice = async (): Promise<BigNumber> => {
    let result = new BigNumber(500).multipliedBy(10 ** 9) // upper limit 120 gwei
    const lowerLimit = new BigNumber(3).multipliedBy(10 ** 9) // lower limit 3 gwei

    const url = `https://ethgasstation.info/json/ethgasAPI.json`
    try {
      const response = await fetch(url)
      const jsonData = await response.json()
      if (jsonData.average) {
        // ethgasstation values need divide by 10 to get gwei
        const gasPriceAvg = new BigNumber(jsonData.average).multipliedBy(10 ** 8)
        const gasPriceSafeLow = new BigNumber(jsonData.safeLow).multipliedBy(10 ** 8)
        if (gasPriceAvg.lt(result)) {
          result = gasPriceAvg
        } else if (gasPriceSafeLow.lt(result)) {
          result = gasPriceSafeLow
        }
      }
    } catch (error) {
      // console.log(error);
      result = new BigNumber(60).multipliedBy(10 ** 9) // error default 60 gwei
    }

    if (result.lt(lowerLimit)) {
      result = lowerLimit
    }

    return result
  }

  /**
   * Get addresses of the stakeable tokens.
   * Throws an error if there is a missing address
   */
  public getStakeableAddresses() {
    if (!this.contractsSource) {
      throw new Error('Missing contract sources')
    }
    const bzrx = this.getErc20AddressOfAsset(Asset.BZRX)
    const vbzrx = this.getErc20AddressOfAsset(Asset.VBZRX)
    const ibzrx = this.getErc20AddressOfAsset(Asset.IBZRX)
    const bpt = this.getErc20AddressOfAsset(Asset.BPT)

    if (!bzrx || !vbzrx || !ibzrx || !bpt) {
      throw new Error('Missing stakeable token address')
    }

    return { bzrx, vbzrx, ibzrx, bpt }
  }

  /**
   * Get the staking specific tokens balances from a user wallet
   * @param userAddress user wallet
   */
  public async getStakeableBalances(userAddress: string) {
    if (!this.contractsSource) {
      throw new Error('Missing contract sources')
    }
    const helper = await this.contractsSource.getHelperContract()
    const addresses = this.getStakeableAddresses()
    const [bzrx, vbzrx, ibzrx, bpt] = await helper.balanceOf.callAsync(
      [addresses.bzrx, addresses.vbzrx, addresses.ibzrx, addresses.bpt],
      userAddress
    )

    return { bzrx, vbzrx, ibzrx, bpt }
  }

  /**
   * Get the spending allowance for each stakeable asset for a user wallet
   * @param userAddress user wallet
   */

  public async getStakeableAllowances(userAddress: string) {
    if (!this.contractsSource) {
      throw new Error('Missing contract sources')
    }
    const helper = await this.contractsSource.getHelperContract()
    const addresses = this.getStakeableAddresses()
    const stakingAddress = this.contractsSource.getStakingV1Address()
    const [bzrx, vbzrx, ibzrx, bpt] = await helper.allowance.callAsync(
      [addresses.bzrx, addresses.vbzrx, addresses.ibzrx, addresses.bpt],
      userAddress,
      stakingAddress
    )

    return { bzrx, vbzrx, ibzrx, bpt }
  }

  public getRepresentatives = async (): Promise<
    Array<{
      bpt: BigNumber
      bzrx: BigNumber
      ibzrx: BigNumber
      name: string
      totalVotes: BigNumber
      vbzrx: BigNumber
      wallet: string
    }>
  > => {
    const stakingContract = await this.getStakingContract()
    const account = this.getCurrentAccount()

    if (!stakingContract || !account) {
      return []
    }

    const repVotes = await stakingContract.getDelegateVotes.callAsync(
      new BigNumber(0),
      new BigNumber(100),
      {
        from: account
      }
    )

    return repVotes.map((rep) => ({
      name: hashUtils.shortHash(rep.user, 6, 4),
      wallet: rep.user,
      bzrx: rep.BZRX.div(10 ** 18),
      bpt: rep.LPToken.div(10 ** 18),
      ibzrx: rep.iBZRX.div(10 ** 18),
      vbzrx: rep.vBZRX.div(10 ** 18),
      totalVotes: rep.totalVotes
    }))
  }

  /**
   * Change the delegate for the current account
   */
  public async changeDelegate(delegateAddress: string) {
    const account = this.getCurrentAccount()
    const staking = await this.getStakingContract()

    if (!account || !staking) {
      throw new Error('Missing account or Staking contract')
    }

    const { gasAmount } = await this.getGasEstimate(() =>
      staking.changeDelegate.estimateGasAsync(delegateAddress, {
        from: account
      })
    )

    const txHash = await staking.changeDelegate.sendTransactionAsync(delegateAddress, {
      from: account,
      gas: gasAmount,
      gasPrice: await this.gasPrice()
    })

    await this.waitForTransactionMined(txHash)
    return true
  }

  /**
   * User gets 4 types of rewards (earnings)
   * [bzrx, stableCoin, bzrxVesting, stableCoinVesting]
   */
  public getStakingRewards = async (): Promise<{
    bzrx: BigNumber
    stableCoin: BigNumber
    bzrxVesting: BigNumber
    stableCoinVesting: BigNumber
  }> => {
    const account = this.getCurrentAccount()
    const stakingContract = await this.getStakingContract()

    if (!account || !stakingContract) {
      throw new Error('missing account / staking contract')
    }

    // [bzrx, stableCoin, bzrxVesting, stableCoinVesting]
    const result = await stakingContract.earned.callAsync(account, {
      from: account
    })

    return {
      bzrx: result[0].div(10 ** 18),
      stableCoin: result[1].div(10 ** 18),
      bzrxVesting: result[2].div(10 ** 18),
      stableCoinVesting: result[3].div(10 ** 18)
    }
  }

  /**
   * Helper to get the gas estimate
   * @param task a function that calls estimateGasAsync under the hood
   *
   * Example
   * ```
   * const { gasAmount } = await this.getGasEstimate(() =>
   *  stakingContract.exit.estimateGasAsync({
   *    from: account,
   *    gas: this.gasLimit
   *  })
   * )
   * ```
   */
  public async getGasEstimate(task: () => Promise<number>) {
    const gasAmount = await task()
    const gasAmountBN = new BigNumber(gasAmount)
      .multipliedBy(this.gasBufferCoeff)
      .integerValue(BigNumber.ROUND_UP)
    return {
      gasAmount: gasAmountBN ? gasAmountBN.toString() : this.gasLimit,
      gasAmountBN
    }
  }

  /**
   * Returns delegate for current account
   */
  public getDelegateAddress = async (): Promise<string> => {
    const account = this.getCurrentAccount()
    const staking = await this.getStakingContract()

    if (!account || !staking) {
      throw new Error('Missing contract or account')
    }

    return staking.delegate.callAsync(account, {
      from: account
    })
  }

  public getRebateRewards = async (): Promise<BigNumber> => {
    const account = this.getCurrentAccount()

    if (!this.contractsSource || !account) {
      throw new Error('Missing contract or account')
    }

    const bZxContract = await this.contractsSource.getiBZxContract()
    const vbzrxAmount = await bZxContract.rewardsBalanceOf.callAsync(account, {
      from: account
    })

    return vbzrxAmount.div(10 ** 18)
  }

  private waitForTransactionMinedRecursive = async (
    txHash: string,
    web3Wrapper: Web3Wrapper
  ): Promise<TransactionReceipt> => {
    const receipt = await web3Wrapper.getTransactionReceiptIfExistsAsync(txHash)
    if (receipt) {
      return receipt
    } else {
      await this.sleep(5000)
      return this.waitForTransactionMinedRecursive(txHash, web3Wrapper)
    }
  }

  public waitForTransactionMined = async (txHash: string) => {
    if (!this.web3Wrapper) {
      throw new Error('web3 is not available')
    }
    return this.waitForTransactionMinedRecursive(txHash, this.web3Wrapper)
  }

  public stake = (tokenAmounts: Map<stakeableToken, BigNumber>) => {
    const opId = (Math.random() + 1).toString()
    this.emit('TaskUpdate', {
      opId,
      opType: 'staking',
      type: 'created',
      value: Date.now()
    })
    return { opId, type: 'staking', result: this._stake(tokenAmounts, opId) }
  }

  /**
   * Send stake request.
   * Amounts should be in decimal base.
   * eg: if user wants to unstake 10 BZRX then bzrx argument should be new BigNumber(10)
   * @param tokenAmounts amount of bzrx, vbzrx, ibzrx and bpt to stake
   */
  public _stake = async (tokenAmounts: Map<stakeableToken, BigNumber>, opId?: string) => {
    const account = this.getCurrentAccount()
    const stakingContract = await this.getStakingContract()
    const stakeableAddresses = this.getStakeableAddresses()

    if (!account || !stakingContract) {
      throw new Error('Missing account of stakingContract')
    }

    const { addresses, amounts } = Array.from(tokenAmounts).reduce(
      (acc, [token, amount]) => {
        acc.amounts.push(amount.times(10 ** 18))
        acc.addresses.push(stakeableAddresses[token])
        return acc
      },
      { addresses: [] as string[], amounts: [] as BigNumber[] }
    )

    const { gasAmount } = await this.getGasEstimate(() =>
      stakingContract.stake.estimateGasAsync(addresses, amounts, {
        from: account
      })
    )

    const txHash = await stakingContract.stake.sendTransactionAsync(addresses, amounts, {
      from: account,
      gas: gasAmount,
      gasPrice: await this.gasPrice()
    })

    if (opId) {
      this.emit('TaskUpdate', { opId: opId, type: 'txhash', value: txHash })
    }

    await this.waitForTransactionMined(txHash)
  }

  /**
   * Send unstake request.
   * Amounts should be in decimal base.
   * eg: if user wants to unstake 10 BZRX then bzrx argument should be new BigNumber(10)
   * @param tokens amount of bzrx, vbzrx and bpt to stake
   */
  public unstakeTokens = async (tokenAmounts: Map<stakeableToken, BigNumber>) => {
    const account = this.getCurrentAccount()
    const stakingContract = await this.getStakingContract()
    const stakeableAddresses = this.getStakeableAddresses()

    if (!account || !stakingContract) {
      throw new Error('Missing account of stakingContract')
    }

    const { addresses, amounts } = Array.from(tokenAmounts).reduce(
      (acc, [token, amount]) => {
        acc.amounts.push(amount.times(10 ** 18))
        acc.addresses.push(stakeableAddresses[token])
        return acc
      },
      { addresses: [] as string[], amounts: [] as BigNumber[] }
    )

    const { gasAmount } = await this.getGasEstimate(() =>
      stakingContract.unstake.estimateGasAsync(addresses, amounts, {
        from: account
      })
    )

    const txHash = await stakingContract.unstake.sendTransactionAsync(addresses, amounts, {
      from: account,
      gas: gasAmount,
      gasPrice: await this.gasPrice()
    })

    await this.waitForTransactionMined(txHash)
  }

  public claimStakingRewards = async (shouldRestake: boolean = false) => {
    const account = this.getCurrentAccount()
    const stakingContract = await this.getStakingContract()

    if (!account || !stakingContract) {
      throw new Error('Missing account or contract')
    }

    const method = shouldRestake ? stakingContract.claimAndRestake : stakingContract.claim

    const { gasAmount } = await this.getGasEstimate(() =>
      method.estimateGasAsync({
        from: account
      })
    )

    const txHash = await method.sendTransactionAsync({
      from: account,
      gas: gasAmount,
      gasPrice: await this.gasPrice()
    })

    await this.waitForTransactionMined(txHash)
  }

  /**
   * "Rebate Rewards" earned by using the platform.
   * User gets back half of the fees in VBZRX
   */
  public async claimRebateRewards() {
    const account = this.getCurrentAccount()
    const bZxContract = await this.contractsSource!.getiBZxContract()
    if (!account || !bZxContract) {
      throw new Error('No account/ibzx contract available!')
    }

    const { gasAmount } = await this.getGasEstimate(() =>
      bZxContract.claimRewards.estimateGasAsync(account, {
        from: account
      })
    )

    const txHash = await bZxContract.claimRewards.sendTransactionAsync(account, {
      from: account,
      gas: gasAmount,
      gasPrice: await this.gasPrice()
    })

    await this.waitForTransactionMined(txHash)
  }

  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  public getRequestTask() {
    return this.requestTask
  }
}

export default new StakingProvider()
