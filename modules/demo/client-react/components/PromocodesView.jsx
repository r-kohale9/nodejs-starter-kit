import React from 'react';
import { PropTypes } from 'prop-types';
import { List, Row, Col } from 'antd';

import PageLayout from './PageLayout';
import PromoCardComponent from './PromoCardComponent';

const PromocodesView = props => {
  const { promocodes, history, onSubmit } = props;
  return (
    <PageLayout history={history} title="Promocodes">
      <div style={{ marginTop: '50px' }} />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3
        }}
        dataSource={promocodes}
        renderItem={item => (
          <List.Item>
            <PromoCardComponent promocode={item} onApply={onSubmit} />
          </List.Item>
        )}
      />
    </PageLayout>
  );
};

PromocodesView.propTypes = {
  promocodes: PropTypes.array,
  history: PropTypes.object,
  onSubmit: PropTypes.func
};

export default PromocodesView;
