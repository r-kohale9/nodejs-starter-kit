import React from 'react';
import { PropTypes } from 'prop-types';
import { List, Row, Col, Divider } from 'antd';

import PageLayout from './PageLayout';
import PromoCardComponent from './PromoCardComponent';
import SuggestedPromoCodesListComponent from './SuggestedPromoCodesListComponent';

const NoPromCodesMessage = ({ t }) => <div className="text-center">No promo codes</div>;
NoPromCodesMessage.propTypes = { t: PropTypes.func };

const PromocodesView = props => {
  const { promocodes, getPromoCodes, loading, t, history, onSubmit } = props;
  return (
    <PageLayout history={history} title="Promocodes">
      <div style={{ marginTop: '50px' }} />
      {getPromoCodes && getPromoCodes.totalCount ? (
        <div>
          <h2 className="headingTop">
            <strong>All PromoCodes</strong>
          </h2>
          <Divider style={{ margin: '5px 0px 10px' }} />
          <SuggestedPromoCodesListComponent {...props} />
        </div>
      ) : !loading ? (
        <NoPromCodesMessage t={t} />
      ) : null}
    </PageLayout>
  );
};

PromocodesView.propTypes = {
  promocodes: PropTypes.array,
  history: PropTypes.object,
  onSubmit: PropTypes.func
};

export default PromocodesView;
