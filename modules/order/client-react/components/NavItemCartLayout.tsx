import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Divider, Button } from '@gqlapp/look-client-react';
import { priceCommaSeparator } from '@gqlapp/listing-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

import { TotalPrice } from './function';
import ROUTES from '../routes/index';
// types
import { getCart_getCart_orderDetails } from '../graphql/__generated__/getCart';

interface NavItemCartLayoutProps {
  Compo: React.ElementType;
  onDelete: (id: number) => void;
  width: string;
  height: string;
  itemName: string;
  data: Array<getCart_getCart_orderDetails | null> | null;
  onEdit: (id: number, optionsId: number, quantity: number) => void;
  componentProps: { mobile: boolean; t: TranslateFunction };
  node?: getCart_getCart_orderDetails;
}

const NavItemCartLayout: React.FunctionComponent<NavItemCartLayoutProps> = props => {
  // console.log('carousel', props);
  const { Compo, itemName, height, width, onEdit, onDelete } = props;

  return (
    <>
      <div style={{ position: 'relative', width }}>
        <div style={{ maxHeight: height, overflow: 'hidden', overflowY: 'auto' }}>
          {props.data.map((item: getCart_getCart_orderDetails, key: number) => {
            const obj = {};
            obj[itemName] = props.node ? item.node : item;
            return (
              <Row>
                <Col>
                  <Compo
                    {...obj}
                    key={key}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    modalName={item.modalName}
                    modalId={item.modalId}
                  />
                </Col>
                <Divider style={{ margin: '0px', borderWidth: '2px' }} />
              </Row>
            );
          })}
        </div>
        <Row style={{ backgroundColor: 'whitesmoke' }}>
          <Col span={24}>
            <Row style={{ padding: '12px 12px 0 12px' }}>
              <Col span={16}>
                {/* <h3 style={{ padding: '15px 0px 0px 12px' }}> */}
                SHIPING:
                {/* </h3> */}
              </Col>
              <Col span={8}>
                <Row justify="end">
                  {/* <h3 style={{ padding: '15px 0px 0px 15px' }}> */}
                  FREE
                  {/* </h3> */}
                </Row>
              </Col>
            </Row>
            <Row style={{ padding: '12px 12px 0 12px' }}>
              <Col span={16}>
                {/* <h3 style={{ padding: '15px 0px 0px 12px' }}> */}
                Total:
                {/* </h3> */}
              </Col>
              <Col span={8}>
                <Row justify="end">
                  {/* <h3 style={{ padding: '15px 0px 0px 15px' }}> */}
                  &#8377;&nbsp;{priceCommaSeparator(TotalPrice(props.data))}
                  {/* </h3> */}
                </Row>
              </Col>
            </Row>
            <Row style={{ padding: '5px 12px' }}>
              <Button block color="primary">
                <Link to={ROUTES.checkoutCart}>CHECKOUT</Link>
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NavItemCartLayout;
