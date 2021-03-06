import React, { Component } from 'react'
import { Header } from '../layout/Header'
import { ITxRowProps } from '../components/TxRow'
import { TxGrid } from '../components/TxGrid'
import { Search } from '../components/Search'
import { RouteComponentProps } from 'react-router'
import { ExplorerProvider } from '../services/ExplorerProvider'
import { ExplorerProviderEvents } from '../services/events/ExplorerProviderEvents'
import { Loader } from '../components/Loader'
import { NavService } from '../services/NavService'
import { ProviderType } from '../domain/ProviderType'

interface MatchParams {
  filter: string
}

interface ISearchResultPageProps extends RouteComponentProps<MatchParams> {
  doNetworkConnect: () => void
  isMobileMedia: boolean
}

interface ISearchResultPageState {
  events: ITxRowProps[]
  filter: string
  filteredEvents: ITxRowProps[]
  showSearchResult: boolean
  isLoading: boolean
}
export class SearchResultPage extends Component<ISearchResultPageProps, ISearchResultPageState> {
  constructor(props: any) {
    super(props)
    this.state = {
      events: [],
      filteredEvents: [],
      showSearchResult: false,
      isLoading: false,
      filter: this.props.match.params.filter.toLowerCase()
    }
    this._isMounted = false
    ExplorerProvider.Instance.eventEmitter.on(
      ExplorerProviderEvents.ProviderAvailable,
      this.onProviderAvailable
    )
    ExplorerProvider.Instance.eventEmitter.on(
      ExplorerProviderEvents.ProviderChanged,
      this.onProviderChanged
    )
  }

  private _isMounted: boolean

  private onProviderChanged = () => {
    this.derivedUpdate()
  }

  private onProviderAvailable = () => {
    this.derivedUpdate()
  }

  public componentWillUnmount(): void {
    this._isMounted = false
    ExplorerProvider.Instance.eventEmitter.removeListener(
      ExplorerProviderEvents.ProviderAvailable,
      this.onProviderAvailable
    )
    ExplorerProvider.Instance.eventEmitter.removeListener(
      ExplorerProviderEvents.ProviderChanged,
      this.onProviderChanged
    )
  }

  derivedUpdate = async () => {
    if (ExplorerProvider.Instance.providerType === ProviderType.None) {
      this.setState({ filter: '' })
      return
    }
    this.setState({ isLoading: true })
    const liquidationEvents = ExplorerProvider.Instance.getGridItems(
      await ExplorerProvider.Instance.getLiquidationHistory()
    )
    const tradeEvents = ExplorerProvider.Instance.getGridItems(
      await ExplorerProvider.Instance.getTradeHistory()
    )
    const rolloverEvents = ExplorerProvider.Instance.getGridItems(
      await ExplorerProvider.Instance.getRolloverHistory()
    )
    const closeEvents = ExplorerProvider.Instance.getGridItems(
      await ExplorerProvider.Instance.getCloseWithSwapHistory()
    )
    const closeWithDepositEvents = ExplorerProvider.Instance.getGridItems(
      await ExplorerProvider.Instance.getCloseWithDepositHistory()
    )
    const borrowEvents = ExplorerProvider.Instance.getGridItems(
      await ExplorerProvider.Instance.getBorrowHistory()
    )
    const events: ITxRowProps[] = liquidationEvents
      .concat(closeEvents)
      .concat(tradeEvents)
      .concat(closeWithDepositEvents)
      .concat(borrowEvents)
      .concat(rolloverEvents)

    this._isMounted &&
      this.setState({
        ...this.state,
        events,
        isLoading: false
      })
    this.onSearch(this.state.filter)
  }

  public componentDidMount(): void {
    this._isMounted = true
    this.derivedUpdate()
  }

  onSearch = (filter: string) => {
    if (filter === '') {
      this._isMounted &&
        this.setState({
          ...this.state,
          showSearchResult: false,
          filteredEvents: []
        })
      return
    }
    const filteredEvents = this.state.events.filter(
      (e) =>
        e.hash.toLowerCase() === filter.toLowerCase() ||
        e.account.toLowerCase() === filter.toLowerCase()
    )
    NavService.Instance.History.push(`/search/${filter}`)

    this._isMounted &&
      this.setState({
        ...this.state,
        showSearchResult: true,
        filteredEvents,
        filter: filter
      })
  }

  public render() {
    const isWalletConnected = ExplorerProvider.Instance.providerType !== ProviderType.None
    return (
      <React.Fragment>
        <Header
          isMobileMedia={this.props.isMobileMedia}
          doNetworkConnect={this.props.doNetworkConnect}
        />
        <section className="search-container pt-45">
          <Search onSearch={this.onSearch.bind(this)} initialFilter={this.state.filter} />
        </section>
        {isWalletConnected && (
          <section className="pt-90">
            <div className="container">
              <h1 className="pb-45">Result:</h1>

              {this.state.isLoading ? (
                <div className="pt-45 pb-45">
                  <Loader quantityDots={5} sizeDots={'large'} title={'Loading'} isOverlay={false} />
                </div>
              ) : (
                <TxGrid
                  events={
                    !this.state.showSearchResult ? this.state.events : this.state.filteredEvents
                  }
                  quantityTx={25}
                />
              )}
            </div>
          </section>
        )}
      </React.Fragment>
    )
  }
}
