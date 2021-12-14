import React from 'react';
import { useIntl } from 'react-intl';
import { normalize } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useAppDataContext } from '../../../libs/pool-data-provider';
import IncentiveClaimItem from '../../IncentiveClaimItem';

import messages from './messages';
import staticStyles from './style';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';

export default function IncentiveWrapper() {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();

  const { user } = useAppDataContext();
  const { currentMarketData } = useProtocolDataContext();
  // Only display assets for which user has claimable rewards
  const userIncentivesFiltered = user
    ? Object.fromEntries(
        Object.entries(user?.calculatedUserIncentives).filter(
          (entry) => Number(entry[1].claimableRewards) > 0
        )
      )
    : [];

  if (!user || Object.keys(userIncentivesFiltered).length === 0) return null;

  return (
    <div className="IncentiveWrapper">
      <p className="IncentiveWrapper__title">{intl.formatMessage(messages.availableReward)}</p>

      <div className="IncentiveWrapper__incentives">
        {Object.entries(userIncentivesFiltered).map((incentive) => {
          const rewardTokenSymbol = incentive[1].rewardTokenSymbol;
          const claimableRewards = normalize(
            incentive[1].claimableRewards,
            incentive[1].rewardTokenDecimals
          );
          return (
            <IncentiveClaimItem
              key={incentive[0]}
              symbol={rewardTokenSymbol}
              claimableRewards={claimableRewards}
              rewardTokenAddress={incentive[0]}
            />
          );
        })}
        {currentMarketData.v3 ? (
          <IncentiveClaimItem
            key={'claimAll'}
            symbol={''}
            claimableRewards={''}
            rewardTokenAddress={''}
            claimAll={true}
          />
        ) : (
          <></>
        )}
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .IncentiveWrapper__title {
          color: ${sm ? currentTheme.textDarkBlue.hex : currentTheme.white.hex};
        }
      `}</style>
    </div>
  );
}
