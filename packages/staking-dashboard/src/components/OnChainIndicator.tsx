import React, { PureComponent } from 'react'
import { ProviderType } from '../domain/ProviderType'
import { ProviderTypeDetails } from '../domain/ProviderTypeDetails'
import { ProviderTypeDictionary } from '../domain/ProviderTypeDictionary'
import { ProviderChangedEvent } from '../services/events/ProviderChangedEvent'
import stakingProvider from '../services/StakingProvider'

export interface IOnChainIndicatorProps {
  doNetworkConnect: () => void
}

interface IOnChainIndicatorState {
  isLoading: boolean
  isSupportedNetwork: boolean
  etherscanURL: string
  accountText: string
  providerTypeDetails: ProviderTypeDetails | null
}

export default class OnChainIndicator extends PureComponent<
  IOnChainIndicatorProps,
  IOnChainIndicatorState
> {
  constructor(props: IOnChainIndicatorProps) {
    super(props)

    this.state = {
      isLoading: false,
      isSupportedNetwork: true,
      etherscanURL: '',
      accountText: '',
      providerTypeDetails: null
    }

    stakingProvider.on('ProviderIsChanging', this.onProviderIsChanging)

    stakingProvider.on('ProviderChanged', this.onProviderChanged)
  }
  private _isMounted: boolean = false

  private onProviderIsChanging = async () => {
    this._isMounted &&
      this.setState({
        ...this.state,
        isLoading: true
      })
  }

  private onProviderChanged = async (event: ProviderChangedEvent) => {
    this._isMounted &&
      this.setState({
        ...this.state,
        isLoading: true
      })
    this.derivedUpdate()
  }

  public async componentDidMount() {
    this._isMounted = true
    this.derivedUpdate()
  }

  public componentWillUnmount(): void {
    this._isMounted = false
    stakingProvider.off('ProviderChanged', this.onProviderChanged)
  }

  private derivedUpdate() {
    const accountText =
      stakingProvider.accounts.length > 0 && stakingProvider.accounts[0]
        ? stakingProvider.accounts[0].toLowerCase()
        : ''

    let providerTypeDetails = null
    if (accountText && stakingProvider.providerType !== ProviderType.None) {
      providerTypeDetails = ProviderTypeDictionary.providerTypes.get(stakingProvider.providerType)
    }

    const isLoading = stakingProvider.isLoading
    const isSupportedNetwork = !stakingProvider.unsupportedNetwork
    const etherscanURL = stakingProvider.web3ProviderSettings
      ? stakingProvider.web3ProviderSettings.etherscanURL
      : ''

    this._isMounted &&
      this.setState({
        ...this.state,
        isLoading,
        isSupportedNetwork,
        etherscanURL,
        accountText,
        providerTypeDetails: providerTypeDetails || null
      })
  }

  public render() {
    const {
      isLoading,
      isSupportedNetwork,
      etherscanURL,
      providerTypeDetails,
      accountText
    } = this.state

    let walletAddressText: string
    if (stakingProvider.unsupportedNetwork) {
      walletAddressText = 'Wrong Network!'
    } else if (accountText) {
      walletAddressText = `${accountText.slice(0, 6)}...${accountText.slice(
        accountText.length - 4,
        accountText.length
      )}`
    } else {
      walletAddressText = ''
    }

    return (
      <div
        className={`on-chain-indicator ${providerTypeDetails !== null ? `connect` : 'disconnect'}`}>
        <button className="on-chain-indicator__container" onClick={this.props.doNetworkConnect}>
          {this.renderProviderDisplay(
            isLoading,
            isSupportedNetwork,
            etherscanURL,
            providerTypeDetails,
            accountText,
            walletAddressText
          )}
        </button>
      </div>
    )
  }

  public renderProviderDisplay(
    isLoading: boolean,
    isSupportedNetwork: boolean,
    etherscanURL: string | null,
    providerTypeDetails: ProviderTypeDetails | null,
    accountText: string | null,
    walletAddressText: string
  ) {
    if (isLoading) {
      return <span className="on-chain-indicator__provider-txt">Loading Wallet...</span>
    }

    if (providerTypeDetails !== null && providerTypeDetails.reactLogoSvgShort !== null) {
      return (
        <React.Fragment>
          <div className="on-chain-indicator__svg">
            {providerTypeDetails.reactLogoSvgShort.render()}
          </div>
          <div className="on-chain-indicator__description">
            <span>{providerTypeDetails.displayName}</span>
            {walletAddressText ? (
              isSupportedNetwork && accountText && etherscanURL ? (
                <a
                  className="on-chain-indicator__wallet-address"
                  href={`${etherscanURL}address/${accountText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}>
                  {walletAddressText}
                </a>
              ) : (
                <span className="on-chain-indicator__wallet-address">{walletAddressText}</span>
              )
            ) : (
              ``
            )}
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <span className="on-chain-indicator__provider-txt">Click To Connect Wallet</span>
        {stakingProvider.unsupportedNetwork ? (
          <span className="on-chain-indicator__wallet-address">{walletAddressText}</span>
        ) : (
          ``
        )}
      </React.Fragment>
    )
  }
}
