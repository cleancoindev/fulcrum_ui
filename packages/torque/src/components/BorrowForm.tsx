import { BigNumber } from '@0x/utils'
import Slider from 'rc-slider'
import React, { ChangeEvent, Component, FormEvent } from 'react'
import TagManager from 'react-gtm-module'
import { merge, Observable, Subject } from 'rxjs'
import { debounceTime, switchMap } from 'rxjs/operators'
import Asset from 'bzx-common/src/assets/Asset'
import AssetsDictionary from 'bzx-common/src/assets/AssetsDictionary'
import { BorrowRequest } from '../domain/BorrowRequest'
import { IBorrowEstimate } from '../domain/IBorrowEstimate'
import { TorqueProvider } from '../services/TorqueProvider'
import { ChiSwitch } from './ChiSwitch'
import { CollateralTokenSelectorToggle } from './CollateralTokenSelectorToggle'
import { Loader } from './Loader'

import { ReactComponent as Edit } from '../assets/images/edit.svg'
import { IDepositEstimate } from '../domain/IDepositEstimate'

const isMainnet = process.env.NODE_ENV && process.env.REACT_APP_ETH_NETWORK === 'mainnet'

export interface IBorrowFormProps {
  borrowAsset: Asset
  onSubmit?: (value: BorrowRequest) => void
  onDecline: () => void
}

interface IBorrowFormState {
  borrowAmount: BigNumber
  collateralAsset: Asset
  borrowAmountValue: string
  depositAmount: BigNumber
  depositAmountValue: string
  gasAmountNeeded: BigNumber
  balanceTooLow: boolean
  didSubmit: boolean
  isLoading: boolean
  isEdit: boolean
  minValue: number
  maxValue: number
  sliderValue: number
  collaterizationPercents: string
  ethBalance: BigNumber
  maxAvailableLiquidity: BigNumber
}

export class BorrowForm extends Component<IBorrowFormProps, IBorrowFormState> {
  private _input: HTMLInputElement | null = null
  private _isMounted: boolean

  private readonly _initDefaults: Subject<null>
  private readonly _borrowAmountChange: Subject<string>
  private readonly _depositAmountChange: Subject<string>
  private readonly _collateralChange: Subject<null>

  public constructor(props: IBorrowFormProps, context?: any) {
    super(props, context)

    this._isMounted = false

    this.state = {
      borrowAmount: new BigNumber(0),
      collateralAsset: TorqueProvider.Instance.isETHAsset(props.borrowAsset)
        ? Asset.USDC
        : isMainnet
        ? Asset.ETH
        : Asset.fWETH,
      borrowAmountValue: '',
      depositAmount: new BigNumber(0),
      depositAmountValue: '',
      ethBalance: new BigNumber(0),
      maxAvailableLiquidity: new BigNumber(0),
      gasAmountNeeded: new BigNumber(3000000),
      balanceTooLow: false,
      didSubmit: false,
      isLoading: true,
      isEdit: false,
      minValue: 120.3019,
      maxValue: 3000,
      sliderValue: 0,
      collaterizationPercents: ''
    }

    this._initDefaults = new Subject<null>()
    this._initDefaults.pipe(debounceTime(50)).subscribe(() => {
      this.setInputDefaults()
    })

    this._borrowAmountChange = new Subject<string>()
    this._collateralChange = new Subject<null>()
    this._depositAmountChange = new Subject<string>()

    this._borrowAmountChange
      .pipe(
        debounceTime(100),
        switchMap((value) => this.rxConvertToBigNumber(value)),
        switchMap((value) => this.rxGetDepositEstimate(value))
      )
      .subscribe(async (next) => {
        this.setDepositEstimate(next.depositAmount)
        this.changeStateLoading()
        await this.checkBalanceTooLow()
      })

    merge(
      this._depositAmountChange.pipe(
        debounceTime(100),
        switchMap((value) => this.rxConvertToBigNumber(value))
      ),
      this._collateralChange.pipe(
        switchMap((value) => this.rxConvertToBigNumber(this.state.depositAmountValue))
      )
    )
      .pipe(switchMap((value) => this.rxGetBorrowEstimate(value)))
      .subscribe(async (next) => {
        this.setBorrowEstimate(next.borrowAmount)
        this.changeStateLoading()
        await this.checkBalanceTooLow()
      })
  }

  private _setInputRef = (input: HTMLInputElement) => {
    this._input = input
  }

  private async setInputDefaults() {
    const ethBalance = await TorqueProvider.Instance.getEthBalance()
    const maxAvailableLiquidity = await TorqueProvider.Instance.getAvailableLiquidaity(
      this.props.borrowAsset
    )
    const minInitialMargin = await TorqueProvider.Instance.getMinInitialMargin(
      this.props.borrowAsset,
      this.state.collateralAsset
    )
    const sliderValue: BigNumber = minInitialMargin.plus(30)
    this.setState({
      isLoading: false,
      maxAvailableLiquidity,
      ethBalance,
      minValue: minInitialMargin.plus(.3019).toNumber(),
      sliderValue: this.inverseCurve(sliderValue.toNumber()),
      collaterizationPercents: sliderValue.toFixed()
    })
  }

  public async componentDidMount() {
    this._initDefaults.next()
  }

  // custom logarithmic-like scale for slider
  // based on https://codesandbox.io/s/qxm182k0mw
  private sliderCurve(x: number): number{
    return new BigNumber((0.30194*Math.exp(2.30097*x)+120)).dp(2, BigNumber.ROUND_HALF_UP).toNumber()
  }
  private inverseCurve(x: number): number{
    return new BigNumber(Math.log((x-120)/0.30194)/2.30097).dp(2, BigNumber.ROUND_HALF_UP).toNumber()
  }

  public render() {
    const amountMsg =
      this.state.ethBalance && this.state.ethBalance.lte(TorqueProvider.Instance.gasBufferForTxn)
        ? 'Insufficient funds for gas'
        : this.state.borrowAmount.gt(this.state.maxAvailableLiquidity) ||
          (this.state.borrowAmount.eq(0) && this.state.depositAmount.gt(0))
        ? 'There is insufficient liquidity available for this loan'
        : this.state.balanceTooLow
        ? `Insufficient ${this.state.collateralAsset} balance in your wallet!`
        : undefined
    return (
      <form className="borrow-form" onSubmit={this.onSubmit} onClick={this.onClickForm}>
        <section className="borrow-form__content">
          <div className="borrow-form__input-container">
            <input
              ref={this._setInputRef}
              className="borrow-form__input-amount"
              type="number"
              step="any"
              value={this.state.borrowAmountValue}
              onChange={this.onTradeAmountChange}
              placeholder={`Enter amount`}
            />
          </div>
          <div className="borrow-form__edit-deposit-by-container">
            <div className="borrow-form__info-collateral-by-msg">To open the loan</div>
            <div className="borrow-form__edit-deposit-by-input">
              {this.state.isLoading ? (
                <Loader quantityDots={4} sizeDots={'middle'} title={''} isOverlay={false} />
              ) : (
                <React.Fragment>
                  {this.state.borrowAmount.gt(0) && this.state.depositAmount.eq(0) ? (
                    <span className="borrow-form__error">Loan is too large</span>
                  ) : (
                    <React.Fragment>
                      <span className="borrow-form__title">You will Deposit</span>
                      <div className="wrapper-input">
                        <div className="borrow-form__max-deposit" onClick={this.setMaxDeposit}>
                          Max
                        </div>
                        <input
                          type="number"
                          step="any"
                          value={this.state.depositAmountValue}
                          onChange={this.onChangeDeposit}
                        />
                        <span className="borrow-form__collateral-asset">
                          {this.state.collateralAsset}
                        </span>
                      </div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
            {!this.state.isLoading && amountMsg !== undefined && (
              <div className="borrow-form__info-collateral-by-amount">
                <div className="borrow-form__insufficient-balance borrow-form__error">
                  {amountMsg}
                </div>
              </div>
            )}
          </div>
          <div className="borrow-form__edit-collateral-by-container">
            <div className="edit-input-wrapper">
              <span>Collateralized</span>
              <div className="edit-input-container">
                {this.state.collaterizationPercents === '' ? (
                  <div className="loader-container">
                    <Loader quantityDots={3} sizeDots={'small'} title={''} isOverlay={false} />
                  </div>
                ) : (
                  <React.Fragment>
                    <div className="edit-input-collateral">
                      <input
                        type="number"
                        step="any"
                        placeholder={`Enter`}
                        value={this.state.collaterizationPercents}
                        className="input-collateral"
                        onChange={this.onCollateralAmountChange}
                      />
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
            <span className="borrow-form__label-safe">Safe</span>
            <React.Fragment>
              <Slider
                step={(this.inverseCurve(this.state.maxValue) - this.inverseCurve(this.state.minValue)) / 100}
                min={this.inverseCurve(this.state.minValue)}
                max={this.inverseCurve(this.state.maxValue)}
                value={this.state.sliderValue}
                onChange={this.onChange}
                onAfterChange={this.onChange}
              />
            </React.Fragment>
          </div>
        </section>

        <ChiSwitch />

        <section className="dialog-actions">
          <div className="borrow-form__actions-container">
            <div className="borrow-form__action-change">
              <CollateralTokenSelectorToggle
                borrowAsset={this.props.borrowAsset}
                collateralAsset={this.state.collateralAsset}
                readonly={this.state.didSubmit}
                onChange={this.onChangeCollateralAsset}
              />
            </div>
            <button
              className={`btn btn-size--small`}
              disabled={this.state.didSubmit || this.state.balanceTooLow || amountMsg !== undefined}
              type="submit">
              {this.state.didSubmit ? 'Submitting...' : 'Borrow'}
            </button>
          </div>
        </section>
      </form>
    )
  }

  private rxConvertToBigNumber = (textValue: string): Observable<BigNumber> => {
    return new Observable<BigNumber>((observer) => {
      observer.next(new BigNumber(textValue))
    })
  }

  private rxGetDepositEstimate = (borrowAmount: BigNumber): Observable<IDepositEstimate> => {
    return new Observable<IDepositEstimate>((observer) => {
      TorqueProvider.Instance.getDepositAmountEstimate(
        this.props.borrowAsset,
        this.state.collateralAsset,
        borrowAmount,
        new BigNumber(this.sliderCurve(this.state.sliderValue))
      ).then((value) => {
        observer.next(value)
      })
    })
  }

  private rxGetBorrowEstimate = (depositAmount: BigNumber): Observable<IBorrowEstimate> => {
    return new Observable<IBorrowEstimate>((observer) => {
      TorqueProvider.Instance.getBorrowAmountEstimate(
        this.props.borrowAsset,
        this.state.collateralAsset,
        depositAmount,
        new BigNumber(this.sliderCurve(this.state.sliderValue))
      ).then((value) => {
        observer.next(value)
      })
    })
  }

  private onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (this.state.borrowAmount.lte(0) || this.state.depositAmount.lte(0)) {
      return
    }

    if (this.props.onSubmit && !this.state.didSubmit && this.state.depositAmount.gt(0)) {
      this.setState({ didSubmit: true })
      await this.checkBalanceTooLow()
      if (this.state.balanceTooLow) {
        this.setState({ didSubmit: false })
        return
      }
      const randomNumber = Math.floor(Math.random() * 100000) + 1
      const usdAmount = await TorqueProvider.Instance.getSwapToUsdRate(this.props.borrowAsset)
      let usdPrice = this.state.borrowAmount
      usdPrice = usdPrice.multipliedBy(usdAmount)

      if (isMainnet) {
        const tagManagerArgs = {
          dataLayer: {
            event: 'purchase',
            transactionId: randomNumber,
            transactionTotal: new BigNumber(usdPrice),
            transactionProducts: [
              {
                name: 'Borrow-' + this.props.borrowAsset,
                sku: 'Borrow-' + this.props.borrowAsset + '-' + this.state.collateralAsset,
                category: 'Borrow',
                price: new BigNumber(usdPrice),
                quantity: 1
              }
            ]
          }
        }
        TagManager.dataLayer(tagManagerArgs)
      }

      this.props.onSubmit(
        new BorrowRequest(
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          this.props.borrowAsset,
          this.state.borrowAmount,
          this.state.collateralAsset,
          this.state.depositAmount
        )
      )
    }
  }

  private onChangeCollateralAsset = async (asset: Asset) => {
    this.setState(
      {
        ...this.state,
        collateralAsset: asset
      },
      () => {
        this._collateralChange.next()
      }
    )
  }

  public onTradeAmountChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // handling different types of empty values
    const inputAmountText = event.target.value ? event.target.value : ''
    if (parseFloat(inputAmountText) < 0) return
    // setting inputAmountText to update display at the same time
    this.setState(
      {
        ...this.state,
        borrowAmountValue: inputAmountText,
        borrowAmount: new BigNumber(inputAmountText),
        isLoading: true
      },
      () => {
        this._borrowAmountChange.next(this.state.borrowAmountValue)
      }
    )
  }

  private checkBalanceTooLow = async () => {
    const collateralAsset = this.state.collateralAsset
    let assetBalance = await TorqueProvider.Instance.getAssetTokenBalanceOfUser(collateralAsset)
    if (collateralAsset === Asset.ETH) {
      assetBalance = assetBalance.gt(TorqueProvider.Instance.gasBufferForTxn)
        ? assetBalance.minus(TorqueProvider.Instance.gasBufferForTxn)
        : new BigNumber(0)
    }
    const decimals = AssetsDictionary.assets.get(collateralAsset)!.decimals || 18

    const balance = assetBalance.dividedBy(10 ** decimals)
    this.setState({ balanceTooLow: balance.lt(this.state.depositAmount) })
  }

  private setDepositEstimate = (amount: BigNumber) => {
    const depositAmount = amount.times(this.state.collaterizationPercents).div(this.state.minValue)

    const depositAmountValue = depositAmount.dp(5, BigNumber.ROUND_CEIL).toString()
    this.setState({
      ...this.state,
      depositAmount: depositAmount,
      depositAmountValue: depositAmountValue,
      isLoading: false
    })
  }

  private setBorrowEstimate = (amount: BigNumber) => {
    const borrowAmountValue = amount.dp(5, BigNumber.ROUND_CEIL).toString()

    this.setState({
      ...this.state,
      borrowAmount: amount,
      borrowAmountValue: borrowAmountValue
    })
  }

  public changeStateLoading = () => {
    if (this.state.depositAmount) this.setState({ isLoading: false })
  }

  public onCollateralAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputCollateralText = event.target.value ? event.target.value : ''
    const inputCollateralValue = Number(inputCollateralText)

    if (parseFloat(inputCollateralText) < 0) return

    const collateralText = inputCollateralText
    let collaterizationPercents = inputCollateralValue

    if (inputCollateralValue < this.state.minValue) collaterizationPercents = this.state.minValue
    if (inputCollateralValue > this.state.maxValue) collaterizationPercents = this.state.maxValue

    this.setState(
      {
        ...this.state,
        collaterizationPercents: collateralText,
        sliderValue: this.inverseCurve(collaterizationPercents)
      },
      () => {
        this._collateralChange.next()
      }
    )
  }

  public editCollateralInput = () => {
    this.setState({ isEdit: true })
  }

  public onClickForm = (event: FormEvent<HTMLFormElement>) => {
    if (this.state.isEdit && (event.target as Element).className !== 'input-collateral') {
      this.setState({ isEdit: false })
      if (this.state.minValue > Number(this.state.collaterizationPercents)) {
        this.setState({ ...this.state, collaterizationPercents: this.state.minValue.toFixed() })
      } else if (Number(this.state.collaterizationPercents) > this.state.maxValue) {
        this.setState({ ...this.state, collaterizationPercents: this.state.maxValue.toFixed() })
      }
    }
  }

  private onChange = async (value: number) => {
    this.setState(
      {
        ...this.state,
        sliderValue: Number(value.toFixed(2)),
        collaterizationPercents: this.sliderCurve(value).toFixed(2)
      },
      () => this._collateralChange.next()
    )
  }

  public onChangeDeposit = async (event: ChangeEvent<HTMLInputElement>) => {
    const depositAmountValue = event.target.value ? event.target.value : ''

    this.setState(
      {
        ...this.state,
        depositAmount: new BigNumber(depositAmountValue),
        depositAmountValue: depositAmountValue
      },
      () => {
        this._depositAmountChange.next(depositAmountValue)
      }
    )
  }

  public setMaxDeposit = async () => {
    await TorqueProvider.Instance.getAssetTokenBalanceOfUser(this.state.collateralAsset).then(
      (balance) => {
        if (this.state.collateralAsset === Asset.ETH) {
          balance = balance.gt(TorqueProvider.Instance.gasBufferForTxn)
            ? balance.minus(TorqueProvider.Instance.gasBufferForTxn)
            : new BigNumber(0)
        }
        const decimals = AssetsDictionary.assets.get(this.state.collateralAsset)!.decimals || 18

        const depositAmount = balance.dividedBy(10 ** decimals)
        const depositAmountValue = depositAmount.dp(5, BigNumber.ROUND_CEIL).toString()
        this.setState(
          {
            isLoading: true,
            depositAmount: depositAmount,
            depositAmountValue: depositAmountValue,
            sliderValue: this.state.maxValue,
            collaterizationPercents: this.state.maxValue.toFixed(2)
          },
          () => {
            this._depositAmountChange.next(depositAmountValue)
          }
        )
      }
    )
  }
}
