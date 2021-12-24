import React from 'react';

import { useIntl } from 'react-intl';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import NoData from '../../../../components/basic/NoData';
import Value from '../../../../components/basic/Value';
import IncentivesCard from '../../../../components/incentives/IncentivesCard';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import CapsHint from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import TableUsageAsCollateral from '../../../dashboard/components/DashboardTable/TableUsageAsCollateral';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { SupplyTableItem } from './types';

export default function SupplyItemMobileCard({
  id,
  symbol,
  underlyingAsset,
  availableToDeposit,
  availableToDepositUSD,
  liquidityRate,
  userId,
  borrowingEnabled,
  isFreezed,
  aIncentives,
  isIsolated,
  totalLiquidity,
  supplyCap,
  isActive,
  isUserInIsolationMode,
  usageAsCollateralEnabled,
}: SupplyTableItem) {
  const intl = useIntl();

  return (
    <MobileCardWrapper symbol={symbol} disabled={isFreezed} isIsolated={isIsolated}>
      <Row title={intl.formatMessage(messages.maxAmount)} withMargin={true}>
        {!userId || Number(availableToDeposit) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={availableToDeposit}
            subValue={availableToDepositUSD}
            maximumSubValueDecimals={2}
            subSymbol="USD"
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            minimumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            nextToValue={
              <CapsHint
                capType={CapType.supplyCap}
                capAmount={supplyCap}
                totalAmount={totalLiquidity}
                tooltipId={`supplyCap__${id}`}
                withoutText={true}
              />
            }
          />
        )}
      </Row>

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.APY)} withMargin={true}>
          {borrowingEnabled ? (
            <IncentivesCard symbol={symbol} value={liquidityRate} incentives={aIncentives} />
          ) : (
            <NoData color="dark" />
          )}
        </Row>
      )}

      <Row title={intl.formatMessage(messages.usageAsCollateral)} withMargin={true}>
        <TableUsageAsCollateral
          isIsolated={isIsolated}
          usageAsCollateralEnabled={usageAsCollateralEnabled}
          isUserInIsolationMode={isUserInIsolationMode}
        />
      </Row>

      <Row
        title={intl.formatMessage(defaultMessages.deposit)}
        className="Row__center"
        withMargin={true}
      >
        <Link
          to={`/deposit/${underlyingAsset}-${id}`}
          className="ButtonLink"
          disabled={!isActive || isFreezed}
        >
          <DefaultButton
            title={intl.formatMessage(defaultMessages.deposit)}
            color="dark"
            disabled={!isActive || isFreezed}
          />
        </Link>
      </Row>

      <Row title={intl.formatMessage(messages.showDetails)} className="Row__center">
        <Link to={`/reserve-overview/${underlyingAsset}-${id}`} className="ButtonLink">
          <DefaultButton
            title={intl.formatMessage(defaultMessages.details)}
            color="dark"
            transparent={true}
          />
        </Link>
      </Row>
    </MobileCardWrapper>
  );
}