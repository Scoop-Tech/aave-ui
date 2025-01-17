import {
  configEnvWithTenderlyAvalancheFork,
  configEnvWithTenderlyPolygonFork,
} from '../../../support/steps/configuration.steps';
import {
  deposit,
  borrow,
  repay,
  withdraw,
  changeBorrowType,
} from '../../../support/steps/main.steps';
import { dashboardAssetValuesVerification } from '../../../support/steps/verification.steps';
import { skipState } from '../../../support/steps/common';
import assets from '../../../fixtures/assets.json';
import constants from '../../../fixtures/constans.json';

const testData = {
  depositBaseAmount: {
    asset: assets.avalancheMarket.AVAX,
    amount: 800,
    hasApproval: true,
  },
  testCases: {
    borrow: {
      asset: assets.polygonMarket.DAI,
      amount: 25,
      apyType: constants.borrowAPYType.variable,
      hasApproval: true,
    },
    deposit: {
      asset: assets.polygonMarket.DAI,
      amount: 10,
      hasApproval: false,
    },
    repay: {
      asset: assets.polygonMarket.DAI,
      amount: 2,
      hasApproval: true,
      repayOption: constants.repayType.default,
    },
    withdraw: {
      asset: assets.polygonMarket.DAI,
      amount: 1,
      hasApproval: true,
    },
  },
  verifications: {
    finalDashboard: [
      {
        type: constants.dashboardTypes.deposit,
        asset: assets.polygonMarket.DAI.shortName,
        amount: 9,
        collateralType: constants.collateralType.isCollateral,
      },
      {
        type: constants.dashboardTypes.borrow,
        asset: assets.polygonMarket.DAI.shortName,
        amount: 23,
        apyType: constants.borrowAPYType.stable,
      },
    ],
  },
};

describe.skip('DAI INTEGRATION SPEC, POLYGON MARKET', () => {
  const skipTestState = skipState(false);
  configEnvWithTenderlyAvalancheFork({});

  deposit(testData.depositBaseAmount, skipTestState, true);
  borrow(testData.testCases.borrow, skipTestState, true);
  deposit(testData.testCases.deposit, skipTestState, true);
  repay(testData.testCases.repay, skipTestState, false);
  withdraw(testData.testCases.withdraw, skipTestState, false);
  dashboardAssetValuesVerification(testData.verifications.finalDashboard, skipTestState);
});
