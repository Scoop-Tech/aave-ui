import {
  // eEthereumTxType,
  // EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
} from '@aave/contract-helpers';
import BaseService from '@aave/contract-helpers/dist/esm/commons/BaseService';
import { providers } from 'ethers';
import { FacuetMock, FacuetMock__factory } from './typechain';

export type FaucetParamsType = {
  userAddress: tEthereumAddress;
  reserve: tEthereumAddress;
};

export class FaucetService extends BaseService<FacuetMock> {
  readonly faucetAddress: string;

  constructor(provider: providers.Provider, faucetAddress?: string) {
    super(provider, FacuetMock__factory);

    this.faucetAddress = faucetAddress ?? '';
  }

  public claimAssets({ userAddress, reserve }: FaucetParamsType): any[] {
    const faucetContract = this.getContractInstance(this.faucetAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => faucetContract.populateTransaction.claimAssets(reserve, userAddress),
      from: userAddress,
      value: '0',
    });

    return [
      {
        tx: txCallback,
        txType: 'FAUCET_CLAIM',
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ];
  }
}
