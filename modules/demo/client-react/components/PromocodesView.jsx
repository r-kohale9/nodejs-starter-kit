import React from 'react';
import { PropTypes } from 'prop-types';
// import { Card, Row, Col } from 'antd';

import PageLayout from './PageLayout';
import PromoCardComponent from './PromoCardComponent';

const PromocodesView = props => {
  const { promocodes, history } = props;
  return (
    <PageLayout history={history}>
      {promocodes.map(promocode => {
        return <PromoCardComponent promocode={promocode} />;
      })}
    </PageLayout>
  );
};

PromocodesView.propTypes = {
  promocodes: PropTypes.array
};

export default PromocodesView;
