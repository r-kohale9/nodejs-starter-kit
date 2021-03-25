import React, { useEffect, useState } from 'react';
import { History } from 'history';
import { SubscribeToMoreOptions } from 'apollo-client';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { enquireScreen } from 'enquire-js';

import { compose } from '@gqlapp/core-common';
import { TranslateFunction, translate } from '@gqlapp/i18n-client-react';
import { Affix, DropDown, Card, Icon, Message, Badge, EmptyComponent } from '@gqlapp/look-client-react';
import { LISTING_ROUTES } from '@gqlapp/listing-client-react';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import { withGetCart, withEditOrderDetail, withDeleteCartItem } from './OrderOperations';
import { subscribeToCart } from './OrderSubscriptions';
import NavItemCartLayout from '../components/NavItemCartLayout';
import NavItemCartComponent from '../components/NavItemCartComponent';
import ROUTES from '../routes';

// type
import { getCart_getCart as GetCart } from '../graphql/__generated__/getCart';
import { EditOrderDetailInput } from '../../../../packages/server/__generated__/globalTypes';

const StyleCard = styled(Card)`
  border: 0px !important;
  border-radius: 0px !important;
  margin-right: 15px !important;
`;

const WhiteDiv = styled.div`
  background: white;
  padding: 5px;
`;

let isMobile: boolean;
enquireScreen((b: boolean) => {
  isMobile = b;
});

interface NavItemCartProps {
  loading: boolean;
  history: History;
  t: TranslateFunction;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  getCart: GetCart;
  currentUserLoading: boolean;
  editOrderDetail: (input: EditOrderDetailInput) => boolean;
  deleteOrderDetail: (id: number) => void;
}

const NavItemCart: React.FunctionComponent<NavItemCartProps> = props => {
  const [visible, setVisible] = useState(false);
  const {
    loading,
    getCart,
    subscribeToMore,
    history,
    editOrderDetail,
    deleteOrderDetail,
    currentUserLoading,
    t
  } = props;

  useEffect(() => {
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, history);
    return () => subscribe();
  });

  const handleEdit = (id: number, optionsId: number, quantity: number) => {
    // console.log(id, optionsId, quantity);
    try {
      const input = {
        id,
        orderOptions: {
          id: optionsId,
          quantity
        }
      };
      // console.log(input);
      const output = editOrderDetail(input);
      output ? Message.success('Edited successfully') : Message.error('Try again');
    } catch (e) {
      throw Error(e);
    }
  };
  const handleDelete = (id: number) => {
    try {
      deleteOrderDetail(id);
      Message.error('Removed from Cart.');
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props navCart', props);
  return (
    <>
      {!loading && (
        <>
          {!currentUserLoading && (
            <DropDown
              style={{ backgroundColor: 'whitesmoke' }}
              content={
                <NavLink to={ROUTES.checkoutCart} className="nav-link" activeClassName="active" visible={visible}>
                  {isMobile ? (
                    <div>
                      <Icon type="ShoppingOutlined" style={{ fontSize: '16px' }} />
                      My Cart&nbsp;
                      <Badge count={getCart && getCart.orderDetails && getCart.orderDetails.length} />
                    </div>
                  ) : (
                    <StyleCard
                      hoverable
                      bodyStyle={{
                        padding: '12px'
                      }}
                      onMouseEnter={() => setVisible(true)}
                      onMouseLeave={() => setVisible(false)}
                    >
                      <Badge count={getCart && getCart.orderDetails && getCart.orderDetails.length} size="small">
                        {visible ? (
                          <Icon type="ShoppingFilled" style={{ fontSize: '16px' }} />
                        ) : (
                          <Icon type="ShoppingOutlined" style={{ fontSize: '16px' }} />
                        )}
                      </Badge>
                    </StyleCard>
                  )}
                </NavLink>
              }
              placement="bottomRight"
              className="navbar-cart-dropdown"
              noicon
              disabled={isMobile}
            >
              <Affix offsetTop={52}>
                <WhiteDiv>
                  {props.getCart && props.getCart.orderDetails && props.getCart.orderDetails.length !== 0 ? (
                    <NavItemCartLayout
                      Compo={NavItemCartComponent}
                      data={props.getCart.orderDetails}
                      width={'300px'}
                      height={'260px'}
                      itemName={'item'}
                      componentProps={{
                        mobile: true,
                        t
                      }}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ) : (
                    <div style={{ padding: '10px' }}>
                      <EmptyComponent
                        applyClass={false}
                        description={'You have no items in your Cart'}
                        emptyLink={`${LISTING_ROUTES.listingCatalogue}`}
                        showAddBtn={true}
                        btnText={t('checkoutCart.btn.add')}
                      />
                    </div>
                  )}
                </WhiteDiv>
              </Affix>
            </DropDown>
          )}
        </>
      )}
    </>
  );
};

export default compose(
  withCurrentUser,
  withGetCart,
  withEditOrderDetail,
  withDeleteCartItem,
  translate('order')
)(NavItemCart);
