import React from 'react';
import { PropTypes } from 'prop-types';
// import { Card, Row, Col } from 'antd';

import PageLayout from './PageLayout';
import PromoCardComponent from './PromoCardComponent';

const PromocodesView = props => {
  const { promocodes, history } = props;
  return (
    <PageLayout history={history} title="Promocodes">
      <div style={{ marginTop: '50px' }} />
      {promocodes.map(promocode => (
        <PromoCardComponent promocode={promocode} />
      ))}
    </PageLayout>
  );
};

PromocodesView.propTypes = {
  promocodes: PropTypes.array,
  history: PropTypes.func
};

export default PromocodesView;
