import { ReserveIncentiveResponse } from '../../../../libs/pool-data-provider/hooks/use-incentives-data';

export type DepositTableItem = {
  id: string;
  underlyingAsset: string;
  symbol: string;
  walletBalance: string;
  availableToDeposit: string;
  availableToDepositUSD: string;
  underlyingBalance: number | string;
  underlyingBalanceInUSD: number | string;
  liquidityRate: number | string;
  aIncentives: ReserveIncentiveResponse[];
  userId?: string;
  borrowingEnabled: boolean;
  isFreezed?: boolean;
  isIsolated: boolean;
  totalLiquidity: string;
  supplyCap: string;
};
