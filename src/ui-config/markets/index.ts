import { ChainId } from '@aave/contract-helpers';
import { MarketDataType } from '../../helpers/config/types';

import * as logos from './images';

export enum CustomMarket {
  // proto_matic = 'proto_matic',
  proto_mumbai = 'proto_mumbai',
}

export const marketsData: { [key in keyof typeof CustomMarket]: MarketDataType } = {
  [CustomMarket.proto_mumbai]: {
    chainId: ChainId.mumbai,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    subLogo: logos.polygon,
    aTokenPrefix: 'AM',
    enabledFeatures: {
      incentives: true,
      faucet: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xABbA3629480242F688A4fa8495451b43a1A8b3BF'.toLowerCase(),
      LENDING_POOL: '0x2D9558a1053a03e874f0A132e6becaEc8309393C',
      WETH_GATEWAY: '0x56d28b1f6700b07a85c74122ae23ef58dEBe704e',
      FAUCET: '0xEE1B8cc42894cd530C67F77F46F453Ea1CB322D4',
    },
  },
  // [CustomMarket.proto_matic]: {
  //   chainId: ChainId.polygon,
  //   logo: logos.aaveLogo,
  //   activeLogo: logos.aaveActiveLogo,
  //   subLogo: logos.polygon,
  //   aTokenPrefix: 'AM',
  //   enabledFeatures: {
  //     liquiditySwap: true,
  //     incentives: true,
  //   },
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0xd05e3E715d945B59290df0ae8eF85c1BdB684744'.toLowerCase(),
  //     LENDING_POOL: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf',
  //     WETH_GATEWAY: '0xbEadf48d62aCC944a06EEaE0A9054A90E5A7dc97',
  //     SWAP_COLLATERAL_ADAPTER: '0x35784a624D4FfBC3594f4d16fA3801FeF063241c',
  //   },
  // },
} as const;
