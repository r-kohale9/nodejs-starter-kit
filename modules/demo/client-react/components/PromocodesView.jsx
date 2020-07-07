import React from 'react';
import { PropTypes } from 'prop-types';

import PageLayout from './PageLayout';
import PromoCardComponent from './PromoCardComponent';
import SuggestedListComponent from './SuggestedListComponent';

const NoPromCodesMessage = ({ t }) => <div className="text-center">No promo codes</div>;
NoPromCodesMessage.propTypes = { t: PropTypes.func };

const PromocodesView = props => {
  const { getPromoCodes, loading, t, history, onSubmit } = props;
  const renderFunc = (key, promoCode) => <PromoCardComponent key={key} onApply={onSubmit} promoCode={promoCode} />;
  const RenderPromoCodes = () => (
    <div>
      <SuggestedListComponent items={getPromoCodes} {...props} renderFunc={renderFunc} />
    </div>
  );

  return (
    <PageLayout history={history} title="Promocodes">
      <div style={{ marginTop: '50px' }} />
      {getPromoCodes && getPromoCodes.totalCount ? (
        <RenderPromoCodes />
      ) : !loading ? (
        <NoPromCodesMessage t={t} />
      ) : null}
    </PageLayout>
  );
};

PromocodesView.propTypes = {
  getPromoCodes: PropTypes.array,
  loading: PropTypes.bool,
  history: PropTypes.object,
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default PromocodesView;
