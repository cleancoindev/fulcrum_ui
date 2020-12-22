export const mainnetAddress = '0xD8Ee69652E4e4838f2531732a46d1f7F584F0b7f'

export const iBZxJson = {
  contractName: 'IBZx',
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'lender',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newPrincipal',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newCollateral',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'interestRate',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'interestDuration',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'collateralToLoanRate',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'currentMargin',
          type: 'uint256'
        }
      ],
      name: 'Borrow',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'token',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'ClaimReward',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'lender',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'closer',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'repayAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'collateralWithdrawAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'collateralToLoanRate',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'currentMargin',
          type: 'uint256'
        }
      ],
      name: 'CloseWithDeposit',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'lender',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'closer',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'positionCloseSize',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'loanCloseAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'exitPrice',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'currentLeverage',
          type: 'uint256'
        }
      ],
      name: 'CloseWithSwap',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'delegator',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'delegated',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'isActive',
          type: 'bool'
        }
      ],
      name: 'DelegatedManagerSet',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'depositToken',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'depositAmount',
          type: 'uint256'
        }
      ],
      name: 'DepositCollateral',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'depositToken',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'depositAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'collateralUsedAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newEndTimestamp',
          type: 'uint256'
        }
      ],
      name: 'ExtendLoanDuration',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sourceToken',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'destToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'sourceAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'destAmount',
          type: 'uint256'
        }
      ],
      name: 'ExternalSwap',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'liquidator',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'lender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'repayAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'collateralWithdrawAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'collateralToLoanRate',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'currentMargin',
          type: 'uint256'
        }
      ],
      name: 'Liquidate',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'LoanInput',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'id',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'minInitialMargin',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'maintenanceMargin',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'maxLoanTerm',
          type: 'uint256'
        }
      ],
      name: 'LoanParamsDisabled',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'id',
          type: 'bytes32'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        }
      ],
      name: 'LoanParamsIdDisabled',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'id',
          type: 'bytes32'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        }
      ],
      name: 'LoanParamsIdSetup',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'id',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'minInitialMargin',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'maintenanceMargin',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'maxLoanTerm',
          type: 'uint256'
        }
      ],
      name: 'LoanParamsSetup',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sourceToken',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'destToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'borrower',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'sourceAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'destAmount',
          type: 'uint256'
        }
      ],
      name: 'LoanSwap',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'withdrawToken',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'withdrawAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newEndTimestamp',
          type: 'uint256'
        }
      ],
      name: 'ReduceLoanDuration',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'caller',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'lender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'collateralAmountUsed',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'interestAmountAdded',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'loanEndTimestamp',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'gasRebate',
          type: 'uint256'
        }
      ],
      name: 'Rollover',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldValue',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256'
        }
      ],
      name: 'SetAffiliateFeePercent',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldValue',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256'
        }
      ],
      name: 'SetBorrowingFeePercent',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'oldController',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newController',
          type: 'address'
        }
      ],
      name: 'SetFeesController',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldValue',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256'
        }
      ],
      name: 'SetLendingFeePercent',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldValue',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256'
        }
      ],
      name: 'SetLiquidationIncentivePercent',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'loanPool',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'underlying',
          type: 'address'
        }
      ],
      name: 'SetLoanPool',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldValue',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256'
        }
      ],
      name: 'SetMaxSwapSize',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'oldValue',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newValue',
          type: 'address'
        }
      ],
      name: 'SetPriceFeedContract',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'token',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'isActive',
          type: 'bool'
        }
      ],
      name: 'SetSupportedTokens',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'oldValue',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newValue',
          type: 'address'
        }
      ],
      name: 'SetSwapsImplContract',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldValue',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256'
        }
      ],
      name: 'SetTradingFeePercent',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'lender',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'positionSize',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'borrowedAmount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'interestRate',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'settlementDate',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'entryPrice',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'entryLeverage',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'currentLeverage',
          type: 'uint256'
        }
      ],
      name: 'Trade',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'token',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'WithdrawBorrowingFees',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'withdrawToken',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'withdrawAmount',
          type: 'uint256'
        }
      ],
      name: 'WithdrawCollateral',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'token',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'WithdrawLendingFees',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'token',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'WithdrawTradingFees',
      type: 'event'
    },
    {
      constant: true,
      inputs: [],
      name: 'affiliateFeePercent',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanParamsId',
          type: 'bytes32'
        },
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'bool',
          name: 'isTorqueLoan',
          type: 'bool'
        },
        {
          internalType: 'uint256',
          name: 'initialMargin',
          type: 'uint256'
        },
        {
          internalType: 'address[4]',
          name: 'sentAddresses',
          type: 'address[4]'
        },
        {
          internalType: 'uint256[5]',
          name: 'sentValues',
          type: 'uint256[5]'
        },
        {
          internalType: 'bytes',
          name: 'loanDataBytes',
          type: 'bytes'
        }
      ],
      name: 'borrowOrTradeFromPool',
      outputs: [
        {
          components: [
            {
              internalType: 'bytes32',
              name: 'loanId',
              type: 'bytes32'
            },
            {
              internalType: 'uint256',
              name: 'principal',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'collateral',
              type: 'uint256'
            }
          ],
          internalType: 'struct LoanOpeningsEvents.LoanOpenData',
          name: '',
          type: 'tuple'
        }
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        },
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        }
      ],
      name: 'borrowerOrders',
      outputs: [
        {
          internalType: 'uint256',
          name: 'lockedAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'interestRate',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'minLoanTerm',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'maxLoanTerm',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'createdTimestamp',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'expirationTimestamp',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'borrowingFeePercent',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'borrowingFeeTokensHeld',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'borrowingFeeTokensPaid',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'bzrxTokenAddress',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        }
      ],
      name: 'claimRewards',
      outputs: [
        {
          internalType: 'uint256',
          name: 'claimAmount',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'depositAmount',
          type: 'uint256'
        }
      ],
      name: 'closeWithDeposit',
      outputs: [
        {
          internalType: 'uint256',
          name: 'loanCloseAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'withdrawAmount',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'withdrawToken',
          type: 'address'
        }
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'gasTokenUser',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'depositAmount',
          type: 'uint256'
        }
      ],
      name: 'closeWithDepositWithGasToken',
      outputs: [
        {
          internalType: 'uint256',
          name: 'loanCloseAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'withdrawAmount',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'withdrawToken',
          type: 'address'
        }
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'swapAmount',
          type: 'uint256'
        },
        {
          internalType: 'bool',
          name: 'returnTokenIsCollateral',
          type: 'bool'
        },
        {
          internalType: 'bytes',
          name: 'loanDataBytes',
          type: 'bytes'
        }
      ],
      name: 'closeWithSwap',
      outputs: [
        {
          internalType: 'uint256',
          name: 'loanCloseAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'withdrawAmount',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'withdrawToken',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'gasTokenUser',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'swapAmount',
          type: 'uint256'
        },
        {
          internalType: 'bool',
          name: 'returnTokenIsCollateral',
          type: 'bool'
        },
        {
          internalType: 'bytes',
          name: '',
          type: 'bytes'
        }
      ],
      name: 'closeWithSwapWithGasToken',
      outputs: [
        {
          internalType: 'uint256',
          name: 'loanCloseAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'withdrawAmount',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'withdrawToken',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'delegatedManagers',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'uint256',
          name: 'depositAmount',
          type: 'uint256'
        }
      ],
      name: 'depositCollateral',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'depositProtocolToken',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32[]',
          name: 'loanParamsIdList',
          type: 'bytes32[]'
        }
      ],
      name: 'disableLoanParams',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'uint256',
          name: 'depositAmount',
          type: 'uint256'
        },
        {
          internalType: 'bool',
          name: 'useCollateral',
          type: 'bool'
        },
        {
          internalType: 'bytes',
          name: '',
          type: 'bytes'
        }
      ],
      name: 'extendLoanDuration',
      outputs: [
        {
          internalType: 'uint256',
          name: 'secondsExtended',
          type: 'uint256'
        }
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'feesController',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: 'start',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'count',
          type: 'uint256'
        },
        {
          internalType: 'bool',
          name: 'unsafeOnly',
          type: 'bool'
        }
      ],
      name: 'getActiveLoans',
      outputs: [
        {
          components: [
            {
              internalType: 'bytes32',
              name: 'loanId',
              type: 'bytes32'
            },
            {
              internalType: 'uint96',
              name: 'endTimestamp',
              type: 'uint96'
            },
            {
              internalType: 'address',
              name: 'loanToken',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'collateralToken',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'principal',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'collateral',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'interestOwedPerDay',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'interestDepositRemaining',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'startRate',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'startMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maintenanceMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'currentMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxLoanTerm',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxLiquidatable',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxSeizable',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'depositValueAsLoanToken',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'depositValueAsCollateralToken',
              type: 'uint256'
            }
          ],
          internalType: 'struct LoanMaintenanceEvents.LoanReturnData[]',
          name: 'loansData',
          type: 'tuple[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getActiveLoansCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'collateralTokenAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'marginAmount',
          type: 'uint256'
        },
        {
          internalType: 'bool',
          name: 'isTorqueLoan',
          type: 'bool'
        }
      ],
      name: 'getBorrowAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: 'borrowAmount',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanParamsId',
          type: 'bytes32'
        },
        {
          internalType: 'uint256',
          name: 'collateralTokenAmount',
          type: 'uint256'
        }
      ],
      name: 'getBorrowAmountByParams',
      outputs: [
        {
          internalType: 'uint256',
          name: 'borrowAmount',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'loanTokenSent',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'collateralTokenSent',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'interestRate',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'newPrincipal',
          type: 'uint256'
        }
      ],
      name: 'getEstimatedMarginExposure',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'lender',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        }
      ],
      name: 'getLenderInterestData',
      outputs: [
        {
          internalType: 'uint256',
          name: 'interestPaid',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'interestPaidDate',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'interestOwedPerDay',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'interestUnPaid',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'interestFeePercent',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'principalTotal',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        }
      ],
      name: 'getLoan',
      outputs: [
        {
          components: [
            {
              internalType: 'bytes32',
              name: 'loanId',
              type: 'bytes32'
            },
            {
              internalType: 'uint96',
              name: 'endTimestamp',
              type: 'uint96'
            },
            {
              internalType: 'address',
              name: 'loanToken',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'collateralToken',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'principal',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'collateral',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'interestOwedPerDay',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'interestDepositRemaining',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'startRate',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'startMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maintenanceMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'currentMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxLoanTerm',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxLiquidatable',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxSeizable',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'depositValueAsLoanToken',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'depositValueAsCollateralToken',
              type: 'uint256'
            }
          ],
          internalType: 'struct LoanMaintenanceEvents.LoanReturnData',
          name: 'loanData',
          type: 'tuple'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        }
      ],
      name: 'getLoanInterestData',
      outputs: [
        {
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'interestOwedPerDay',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'interestDepositTotal',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'interestDepositRemaining',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32[]',
          name: 'loanParamsIdList',
          type: 'bytes32[]'
        }
      ],
      name: 'getLoanParams',
      outputs: [
        {
          components: [
            {
              internalType: 'bytes32',
              name: 'id',
              type: 'bytes32'
            },
            {
              internalType: 'bool',
              name: 'active',
              type: 'bool'
            },
            {
              internalType: 'address',
              name: 'owner',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'loanToken',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'collateralToken',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'minInitialMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maintenanceMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxLoanTerm',
              type: 'uint256'
            }
          ],
          internalType: 'struct LoanParamsStruct.LoanParams[]',
          name: 'loanParamsList',
          type: 'tuple[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'start',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'count',
          type: 'uint256'
        }
      ],
      name: 'getLoanParamsList',
      outputs: [
        {
          internalType: 'bytes32[]',
          name: 'loanParamsList',
          type: 'bytes32[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: 'start',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'count',
          type: 'uint256'
        }
      ],
      name: 'getLoanPoolsList',
      outputs: [
        {
          internalType: 'address[]',
          name: 'loanPoolsList',
          type: 'address[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'newPrincipal',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'marginAmount',
          type: 'uint256'
        },
        {
          internalType: 'bool',
          name: 'isTorqueLoan',
          type: 'bool'
        }
      ],
      name: 'getRequiredCollateral',
      outputs: [
        {
          internalType: 'uint256',
          name: 'collateralAmountRequired',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanParamsId',
          type: 'bytes32'
        },
        {
          internalType: 'uint256',
          name: 'newPrincipal',
          type: 'uint256'
        }
      ],
      name: 'getRequiredCollateralByParams',
      outputs: [
        {
          internalType: 'uint256',
          name: 'collateralAmountRequired',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'sourceToken',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'destToken',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'sourceTokenAmount',
          type: 'uint256'
        }
      ],
      name: 'getSwapExpectedReturn',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'string',
          name: 'sig',
          type: 'string'
        }
      ],
      name: 'getTarget',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'lender',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        }
      ],
      name: 'getTotalPrincipal',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'start',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'count',
          type: 'uint256'
        },
        {
          internalType: 'enum LoanMaintenanceEvents.LoanType',
          name: 'loanType',
          type: 'uint8'
        },
        {
          internalType: 'bool',
          name: 'isLender',
          type: 'bool'
        },
        {
          internalType: 'bool',
          name: 'unsafeOnly',
          type: 'bool'
        }
      ],
      name: 'getUserLoans',
      outputs: [
        {
          components: [
            {
              internalType: 'bytes32',
              name: 'loanId',
              type: 'bytes32'
            },
            {
              internalType: 'uint96',
              name: 'endTimestamp',
              type: 'uint96'
            },
            {
              internalType: 'address',
              name: 'loanToken',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'collateralToken',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'principal',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'collateral',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'interestOwedPerDay',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'interestDepositRemaining',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'startRate',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'startMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maintenanceMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'currentMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxLoanTerm',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxLiquidatable',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxSeizable',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'depositValueAsLoanToken',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'depositValueAsCollateralToken',
              type: 'uint256'
            }
          ],
          internalType: 'struct LoanMaintenanceEvents.LoanReturnData[]',
          name: 'loansData',
          type: 'tuple[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          internalType: 'bool',
          name: 'isLender',
          type: 'bool'
        }
      ],
      name: 'getUserLoansCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address[]',
          name: 'users',
          type: 'address[]'
        },
        {
          internalType: 'uint256[]',
          name: 'amounts',
          type: 'uint256[]'
        }
      ],
      name: 'grantRewards',
      outputs: [
        {
          internalType: 'uint256',
          name: 'totalAmount',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'loanPool',
          type: 'address'
        }
      ],
      name: 'isLoanPool',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'isOwner',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        },
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'lenderInterest',
      outputs: [
        {
          internalType: 'uint256',
          name: 'principalTotal',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'owedPerDay',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'owedTotal',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'paidTotal',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'updatedTimestamp',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        },
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        }
      ],
      name: 'lenderOrders',
      outputs: [
        {
          internalType: 'uint256',
          name: 'lockedAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'interestRate',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'minLoanTerm',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'maxLoanTerm',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'createdTimestamp',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'expirationTimestamp',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'lendingFeePercent',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'lendingFeeTokensHeld',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'lendingFeeTokensPaid',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'closeAmount',
          type: 'uint256'
        }
      ],
      name: 'liquidate',
      outputs: [
        {
          internalType: 'uint256',
          name: 'loanCloseAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'seizedAmount',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'seizedToken',
          type: 'address'
        }
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'gasTokenUser',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'closeAmount',
          type: 'uint256'
        }
      ],
      name: 'liquidateWithGasToken',
      outputs: [
        {
          internalType: 'uint256',
          name: 'loanCloseAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'seizedAmount',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'seizedToken',
          type: 'address'
        }
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        },
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'liquidationIncentivePercent',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        }
      ],
      name: 'loanInterest',
      outputs: [
        {
          internalType: 'uint256',
          name: 'owedPerDay',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'depositTotal',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'updatedTimestamp',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        }
      ],
      name: 'loanParams',
      outputs: [
        {
          internalType: 'bytes32',
          name: 'id',
          type: 'bytes32'
        },
        {
          internalType: 'bool',
          name: 'active',
          type: 'bool'
        },
        {
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'collateralToken',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'minInitialMargin',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'maintenanceMargin',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'maxLoanTerm',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'loanPoolToUnderlying',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        }
      ],
      name: 'loans',
      outputs: [
        {
          internalType: 'bytes32',
          name: 'id',
          type: 'bytes32'
        },
        {
          internalType: 'bytes32',
          name: 'loanParamsId',
          type: 'bytes32'
        },
        {
          internalType: 'bytes32',
          name: 'pendingTradesId',
          type: 'bytes32'
        },
        {
          internalType: 'uint256',
          name: 'principal',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'collateral',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'startTimestamp',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'endTimestamp',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'startMargin',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'startRate',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'borrower',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'lender',
          type: 'address'
        },
        {
          internalType: 'bool',
          name: 'active',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes4',
          name: '',
          type: 'bytes4'
        }
      ],
      name: 'logicTargets',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'maxDisagreement',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'maxSwapSize',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'priceFeeds',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'protocolTokenHeld',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'protocolTokenPaid',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address[]',
          name: 'tokens',
          type: 'address[]'
        },
        {
          internalType: 'enum ProtocolSettingsEvents.FeeClaimType',
          name: 'feeType',
          type: 'uint8'
        }
      ],
      name: 'queryFees',
      outputs: [
        {
          internalType: 'uint256[]',
          name: 'amountsHeld',
          type: 'uint256[]'
        },
        {
          internalType: 'uint256[]',
          name: 'amountsPaid',
          type: 'uint256[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'withdrawAmount',
          type: 'uint256'
        }
      ],
      name: 'reduceLoanDuration',
      outputs: [
        {
          internalType: 'uint256',
          name: 'secondsReduced',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'target',
          type: 'address'
        }
      ],
      name: 'replaceContract',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address'
        }
      ],
      name: 'rewardsBalanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: 'rewardsBalance',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'bytes',
          name: 'loanDataBytes',
          type: 'bytes'
        }
      ],
      name: 'rollover',
      outputs: [
        {
          internalType: 'address',
          name: 'rebateToken',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'gasRebate',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'gasTokenUser',
          type: 'address'
        },
        {
          internalType: 'bytes',
          name: '',
          type: 'bytes'
        }
      ],
      name: 'rolloverWithGasToken',
      outputs: [
        {
          internalType: 'address',
          name: 'rebateToken',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'gasRebate',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256'
        }
      ],
      name: 'setAffiliateFeePercent',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256'
        }
      ],
      name: 'setBorrowingFeePercent',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'delegated',
          type: 'address'
        },
        {
          internalType: 'bool',
          name: 'toggle',
          type: 'bool'
        }
      ],
      name: 'setDelegatedManager',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'newController',
          type: 'address'
        }
      ],
      name: 'setFeesController',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256'
        }
      ],
      name: 'setLendingFeePercent',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address[]',
          name: 'loanTokens',
          type: 'address[]'
        },
        {
          internalType: 'address[]',
          name: 'collateralTokens',
          type: 'address[]'
        },
        {
          internalType: 'uint256[]',
          name: 'amounts',
          type: 'uint256[]'
        }
      ],
      name: 'setLiquidationIncentivePercent',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address[]',
          name: 'pools',
          type: 'address[]'
        },
        {
          internalType: 'address[]',
          name: 'assets',
          type: 'address[]'
        }
      ],
      name: 'setLoanPool',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: 'newAmount',
          type: 'uint256'
        }
      ],
      name: 'setMaxDisagreement',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: 'newAmount',
          type: 'uint256'
        }
      ],
      name: 'setMaxSwapSize',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'newContract',
          type: 'address'
        }
      ],
      name: 'setPriceFeedContract',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: 'newAmount',
          type: 'uint256'
        }
      ],
      name: 'setSourceBufferPercent',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address[]',
          name: 'addrs',
          type: 'address[]'
        },
        {
          internalType: 'bool[]',
          name: 'toggles',
          type: 'bool[]'
        }
      ],
      name: 'setSupportedTokens',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'newContract',
          type: 'address'
        }
      ],
      name: 'setSwapsImplContract',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'string[]',
          name: 'sigsArr',
          type: 'string[]'
        },
        {
          internalType: 'address[]',
          name: 'targetsArr',
          type: 'address[]'
        }
      ],
      name: 'setTargets',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256'
        }
      ],
      name: 'setTradingFeePercent',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          components: [
            {
              internalType: 'bytes32',
              name: 'id',
              type: 'bytes32'
            },
            {
              internalType: 'bool',
              name: 'active',
              type: 'bool'
            },
            {
              internalType: 'address',
              name: 'owner',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'loanToken',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'collateralToken',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'minInitialMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maintenanceMargin',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'maxLoanTerm',
              type: 'uint256'
            }
          ],
          internalType: 'struct LoanParamsStruct.LoanParams[]',
          name: 'loanParamsList',
          type: 'tuple[]'
        }
      ],
      name: 'setupLoanParams',
      outputs: [
        {
          internalType: 'bytes32[]',
          name: 'loanParamsIdList',
          type: 'bytes32[]'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'sourceBufferPercent',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'supportedTokens',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'sourceToken',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'destToken',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'returnToSender',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'sourceTokenAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'requiredDestTokenAmount',
          type: 'uint256'
        },
        {
          internalType: 'bytes',
          name: 'swapData',
          type: 'bytes'
        }
      ],
      name: 'swapExternal',
      outputs: [
        {
          internalType: 'uint256',
          name: 'destTokenAmountReceived',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'sourceTokenAmountUsed',
          type: 'uint256'
        }
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'sourceToken',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'destToken',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'returnToSender',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'gasTokenUser',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'sourceTokenAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'requiredDestTokenAmount',
          type: 'uint256'
        },
        {
          internalType: 'bytes',
          name: 'swapData',
          type: 'bytes'
        }
      ],
      name: 'swapExternalWithGasToken',
      outputs: [
        {
          internalType: 'uint256',
          name: 'destTokenAmountReceived',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'sourceTokenAmountUsed',
          type: 'uint256'
        }
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'swapsImpl',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'tradingFeePercent',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'tradingFeeTokensHeld',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'tradingFeeTokensPaid',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'underlyingToLoanPool',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'vbzrxTokenAddress',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'wethToken',
      outputs: [
        {
          internalType: 'contract IWethERC20',
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'loanToken',
          type: 'address'
        }
      ],
      name: 'withdrawAccruedInterest',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'loanId',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'withdrawAmount',
          type: 'uint256'
        }
      ],
      name: 'withdrawCollateral',
      outputs: [
        {
          internalType: 'uint256',
          name: 'actualWithdrawAmount',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address[]',
          name: 'tokens',
          type: 'address[]'
        },
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'enum ProtocolSettingsEvents.FeeClaimType',
          name: 'feeType',
          type: 'uint8'
        }
      ],
      name: 'withdrawFees',
      outputs: [
        {
          internalType: 'uint256[]',
          name: 'amounts',
          type: 'uint256[]'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'withdrawProtocolToken',
      outputs: [
        {
          internalType: 'address',
          name: 'rewardToken',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'withdrawAmount',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
}
