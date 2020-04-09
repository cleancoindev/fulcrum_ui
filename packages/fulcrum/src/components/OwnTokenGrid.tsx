import React, { Component } from "react";
import { ManageCollateralRequest } from "../domain/ManageCollateralRequest";
import { TradeRequest } from "../domain/TradeRequest";
import { TradeTokenKey } from "../domain/TradeTokenKey";
import { FulcrumProviderEvents } from "../services/events/FulcrumProviderEvents";
import { ProviderChangedEvent } from "../services/events/ProviderChangedEvent";
import { TradeTransactionMinedEvent } from "../services/events/TradeTransactionMinedEvent";
import { FulcrumProvider } from "../services/FulcrumProvider";
import { OwnTokenGridHeader } from "./OwnTokenGridHeader";
import { HistoryTokenGridHeader } from "./HistoryTokenGridHeader";
import { IOwnTokenGridRowProps, OwnTokenGridRow } from "./OwnTokenGridRow";
import { HistoryTokenGridRow } from "./HistoryTokenGridRow";
import { OwnTokenCardMobile } from "./OwnTokenCardMobile";
import { TradeType } from "../domain/TradeType";
import { Asset } from "../domain/Asset";
import { PositionType } from "../domain/PositionType";
import { BigNumber } from "@0x/utils";
export interface IOwnTokenGridProps {
  showMyTokensOnly: boolean;
  selectedKey: TradeTokenKey;

  asset?: Asset;
  positionType?: PositionType;
  // onDetails: (key: TradeTokenKey) => void;
  // onManageCollateral: (request: ManageCollateralRequest) => void;
  onSelect: (key: TradeTokenKey) => void;
  onTrade: (request: TradeRequest) => void;
  isMobileMedia: boolean;
}

interface IOwnTokenGridState {
  tokenRowsData: IOwnTokenGridRowProps[];
  isShowHistory: boolean;
}

export class OwnTokenGrid extends Component<IOwnTokenGridProps, IOwnTokenGridState> {
  constructor(props: IOwnTokenGridProps) {
    super(props);
    this._isMounted = false;
    this.state = {
      tokenRowsData: [],
      isShowHistory: false
    };

    FulcrumProvider.Instance.eventEmitter.on(FulcrumProviderEvents.ProviderChanged, this.onProviderChanged);
    FulcrumProvider.Instance.eventEmitter.on(FulcrumProviderEvents.TradeTransactionMined, this.onTradeTransactionMined);
    this.onShowHistory = this.onShowHistory.bind(this);
    this.onShowOpenPositions = this.onShowOpenPositions.bind(this);
  }

  private _isMounted: boolean;

  public async derivedUpdate() {
    const tokenRowsData = await OwnTokenGrid.getRowsData(this.props);
    this._isMounted && this.setState({ ...this.state, tokenRowsData: tokenRowsData });
  }

  public componentWillUnmount(): void {
    this._isMounted = false;

    FulcrumProvider.Instance.eventEmitter.removeListener(FulcrumProviderEvents.ProviderChanged, this.onProviderChanged);
    FulcrumProvider.Instance.eventEmitter.removeListener(FulcrumProviderEvents.TradeTransactionMined, this.onTradeTransactionMined);
  }

  public componentDidMount(): void {
    this._isMounted = true;

    this.derivedUpdate();
  }

  public componentDidUpdate(
    prevProps: Readonly<IOwnTokenGridProps>,
    prevState: Readonly<IOwnTokenGridState>,
    snapshot?: any
  ): void {
    if (
      this.props.selectedKey !== prevProps.selectedKey ||
      this.props.showMyTokensOnly !== prevProps.showMyTokensOnly
    ) {
      this.derivedUpdate();
    }
  }

  public render() {

    return !this.props.isMobileMedia ? this.renderDesktop() : this.renderMobile();

  }

  private renderDesktop = () => {
    const tokenRows = this.state.tokenRowsData.map(e => <OwnTokenGridRow key={`${e.currentKey.toString()}`} {...e} />);
    const historyRows = this.state.tokenRowsData.map(e => <HistoryTokenGridRow key={`${e.currentKey.toString()}`} {...e} />);
    if (tokenRows.length === 0) return null;

    return (
      <div className="own-token-grid">
        <div className="group-button">
          <button className={`${!this.state.isShowHistory ? `active` : ``}`} onClick={this.onShowOpenPositions}>Open positions</button>
          <button className={`${this.state.isShowHistory ? `active` : ``}`} onClick={this.onShowHistory}>Trade history</button>
        </div>
        {this.state.isShowHistory
          ? <React.Fragment>
            <HistoryTokenGridHeader />
            {historyRows}
          </React.Fragment>
          : <React.Fragment>
            <OwnTokenGridHeader />
            {tokenRows}
          </React.Fragment>
        }

      </div>
    );
  }

  private renderMobile = () => {
    const tokenRows = this.state.tokenRowsData.map(e => <OwnTokenCardMobile key={`${e.currentKey.toString()}`} {...e} />);
    if (tokenRows.length === 0) return null;

    return (
      <div className="own-token-cards">

        <div className="own-token-cards__header">Manage</div>
        <div className="own-token-cards__container">
          {tokenRows}
        </div>
      </div>
    );
  }
  public onSellClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    this.props.onTrade(
      new TradeRequest(
        TradeType.SELL,
        this.props.selectedKey.asset,
        this.props.selectedKey.unitOfAccount,
        this.props.selectedKey.positionType === PositionType.SHORT ? this.props.selectedKey.asset : Asset.USDC,
        this.props.selectedKey.positionType,
        this.props.selectedKey.leverage,
        new BigNumber(0),
        this.props.selectedKey.isTokenized,
        this.props.selectedKey.version
      )
    );
  };

  private static getRowsData = async (props: IOwnTokenGridProps): Promise<IOwnTokenGridRowProps[]> => {
    const rowsData: IOwnTokenGridRowProps[] = [];

    if (FulcrumProvider.Instance.web3Wrapper && FulcrumProvider.Instance.contractsSource && FulcrumProvider.Instance.contractsSource.canWrite) {
      const pTokens = props.asset && props.positionType
        ? FulcrumProvider.Instance.getPTokensAvailable().filter(tradeToken => tradeToken.asset == props.asset && tradeToken.positionType == props.positionType)
        : FulcrumProvider.Instance.getPTokensAvailable()

      const pTokenAddreses: string[] = FulcrumProvider.Instance.getPTokenErc20AddressList();
      const pTokenBalances = await FulcrumProvider.Instance.getErc20BalancesOfUser(pTokenAddreses);
      for (const pToken of pTokens) {
        // console.log(pToken);
        const balance = pTokenBalances.get(pToken.erc20Address);
        if (!balance) {
          continue;
        }

        rowsData.push({
          selectedKey: props.selectedKey,
          currentKey: pToken,
          // // balance: balance,
          // onDetails: props.onDetails,
          // onManageCollateral: props.onManageCollateral,
          onSelect: props.onSelect,
          onTrade: props.onTrade,
          showMyTokensOnly: props.showMyTokensOnly
        });
      }
    }

    return rowsData;
  };

  private onProviderChanged = async (event: ProviderChangedEvent) => {
    await this.derivedUpdate();
  };

  private onTradeTransactionMined = async (event: TradeTransactionMinedEvent) => {
    await this.derivedUpdate();
  };
  private onShowHistory = () => {
    this._isMounted && this.setState({ ...this.state, isShowHistory: true });
  };

  private onShowOpenPositions = () => {
    this._isMounted && this.setState({ ...this.state, isShowHistory: false });
  };
}
