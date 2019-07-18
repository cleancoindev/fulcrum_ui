import { BigNumber } from "@0x/utils";
import React, { PureComponent, RefObject } from "react";
import { BorrowedFundsList } from "../components/BorrowedFundsList";
import { ManageCollateralDlg } from "../components/ManageCollateralDlg";
import { RepayLoanDlg } from "../components/RepayLoanDlg";
import { WalletAddressDlg } from "../components/WalletAddressDlg";
import { WalletAddressHint } from "../components/WalletAddressHint";
import { WalletAddressLargeForm } from "../components/WalletAddressLargeForm";
import { Asset } from "../domain/Asset";
import { BorrowedFundsState } from "../domain/BorrowedFundsState";
import { Footer } from "../layout/Footer";
import { HeaderHome } from "../layout/HeaderHome";

interface IDashboardPageState {
  walletAddress: string | null;
}

export class DashboardPage extends PureComponent<any, IDashboardPageState> {
  private manageCollateralDlgRef: RefObject<ManageCollateralDlg>;
  private repayLoanDlgRef: RefObject<RepayLoanDlg>;
  private walletAddressDlgRef: RefObject<WalletAddressDlg>;

  constructor(props: any) {
    super(props);

    this.manageCollateralDlgRef = React.createRef();
    this.repayLoanDlgRef = React.createRef();
    this.walletAddressDlgRef = React.createRef();

    this.state = { walletAddress: null };
  }

  public render() {
    const items: BorrowedFundsState[] = [
      {
        asset: Asset.ETH,
        amount: BigNumber.random(),
        collateralizedPercent: BigNumber.random(),
        interestRate: BigNumber.random()
      },
      {
        asset: Asset.WBTC,
        amount: BigNumber.random(),
        collateralizedPercent: BigNumber.random(),
        interestRate: BigNumber.random()
      },
      {
        asset: Asset.DAI,
        amount: BigNumber.random(),
        collateralizedPercent: BigNumber.random(),
        interestRate: BigNumber.random()
      },
      {
        asset: Asset.DAI,
        amount: BigNumber.random(),
        collateralizedPercent: BigNumber.random(),
        interestRate: BigNumber.random()
      },
      {
        asset: Asset.DAI,
        amount: BigNumber.random(),
        collateralizedPercent: BigNumber.random(),
        interestRate: BigNumber.random()
      },
      {
        asset: Asset.DAI,
        amount: BigNumber.random(),
        collateralizedPercent: BigNumber.random(),
        interestRate: BigNumber.random()
      },
      {
        asset: Asset.DAI,
        amount: BigNumber.random(),
        collateralizedPercent: BigNumber.random(),
        interestRate: BigNumber.random()
      }
    ];

    return (
      <React.Fragment>
        <ManageCollateralDlg ref={this.manageCollateralDlgRef} />
        <RepayLoanDlg ref={this.repayLoanDlgRef} />
        <WalletAddressDlg ref={this.walletAddressDlgRef} />
        <div className="dashboard-page">
          <HeaderHome />
          <div className="dashboard-page__main">
            {this.state.walletAddress ? (
              <React.Fragment>
                <WalletAddressHint
                  walletAddress={this.state.walletAddress}
                  onSelectNewWalletAddress={this.onSelectNewWalletAddress}
                  onClearWalletAddress={this.onClearWalletAddress}
                />
                <BorrowedFundsList
                  items={items}
                  onRepayLoan={this.onRepayLoan}
                  onManageCollateral={this.onManageCollateral}
                />
              </React.Fragment>
            ) : (
              <div className="dashboard-page__form">
                <WalletAddressLargeForm onSubmit={this.onWalletAddressChange} />
              </div>
            )}
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }

  private onSelectNewWalletAddress = async () => {
    if (this.walletAddressDlgRef.current) {
      try {
        const walletAddress = await this.walletAddressDlgRef.current.getValue();
        this.onWalletAddressChange(walletAddress);
      } finally {
        this.walletAddressDlgRef.current.hide();
      }
    }
  };

  private onClearWalletAddress = () => {
    this.setState({ ...this.state, walletAddress: null });
  };

  private onWalletAddressChange = (walletAddress: string) => {
    this.setState({ ...this.state, walletAddress: walletAddress });
  };

  private onRepayLoan = async (item: BorrowedFundsState) => {
    if (this.repayLoanDlgRef.current) {
      try {
        await this.repayLoanDlgRef.current.getValue(item.asset);
      } finally {
        this.repayLoanDlgRef.current.hide();
      }
    }
  };

  private onManageCollateral = async (item: BorrowedFundsState) => {
    if (this.manageCollateralDlgRef.current) {
      try {
        await this.manageCollateralDlgRef.current.getValue(item.asset);
      } finally {
        this.manageCollateralDlgRef.current.hide();
      }
    }
  };
}