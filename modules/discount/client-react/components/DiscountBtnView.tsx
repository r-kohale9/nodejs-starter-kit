import React from 'react';

import { Divider, Tooltip, Icon, Button } from '@gqlapp/look-client-react';
import { DISCOUNT_ROUTES } from '@gqlapp/discount-client-react';

import { DiscountBtnProps } from '../containers/DiscountBtn';

interface DiscountBtnViewProps extends DiscountBtnProps {}

const DiscountBtnView: React.FunctionComponent<DiscountBtnViewProps> = props => {
  const { loading, modalDiscount, modalName, modalId } = props;
  return (
    <Tooltip title={`${modalDiscount ? 'Edit' : 'Add'} Discount`}>
      <a href={`${modalDiscount ? DISCOUNT_ROUTES.editLink : DISCOUNT_ROUTES.addLink}${modalName}/${modalId}`}>
        <Button
          color="primary"
          shape="circle"
          loading={loading}
          icon={modalDiscount ? <Icon type="EditOutlined" /> : <Icon type="PlusOutlined" />}
        />
        <Divider type="vertical" />
      </a>
    </Tooltip>
  );
};

export default DiscountBtnView;
