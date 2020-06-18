import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Button, Rate, Icon } from 'antd';
import Slider from 'react-slick';
import { withFormik } from 'formik';

import { match, minLength, required, validate, maxLength } from '@gqlapp/validation-common-react';

import PageLayout from './PageLayout';
import SelectModal from './SelectModal';
import AddToCart from './AddToCart';
import PreOrderComponent from './PreOrderComponent';

const ImageBard = styled.div`
  width: ${props => props.width && props.width};
  height: 3px;
  background: #222222;
  border-radius: 4px;
`;

// const ListingDetailsViewFormSchema = {
//   weight: [required],
//   flavour: [required]
// };

const ListingDetailsView = props => {
  const { listing, history, values } = props;
  const { preOrder } = props.location;
  const [preOrd, setPreOrd] = useState(preOrder);

  console.log('preOrder', preOrder);
  const settings = {
    infinite: true,
    centreMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  return (
    <>
      <PageLayout history={history} showMenuBar={false}>
        <Row align="middle" type="flex" justify="space-between">
          <Col span={24}>
            <Slider {...settings}>
              {listing &&
                listing.listingImages.map(listImg => {
                  return (
                    <Row align="middle" type="flex" justify="center">
                      <Col span={24}>
                        <img style={{ height: '413px', width: '100%' }} alt="" src={listImg.imageUrl} />
                      </Col>
                    </Row>
                  );
                })}
            </Slider>
          </Col>
          <Col span={24}>
            <Row type="flex" align="middle" justify="space-between">
              <Col span={10}>
                <Row type="flex" justify="start">
                  <SelectModal
                    title="Weight"
                    fields={['.5 Kg', '1 Kg', '1.5 Kg', '2 Kg', '2.5 Kg']}
                    // value={values.weight}
                    info="Weight info"
                  />
                </Row>
              </Col>
              <Col span={10}>
                <Row type="flex" justify="center">
                  <SelectModal
                    title="Flavour"
                    fields={['Vanilla', 'Chocolate', 'Mango', 'Strawberry', 'Butterscotch']}
                    // value={values.weight}
                    info="Flavour info"
                  />
                </Row>
              </Col>
              <Col span={2}>
                <Row type="flex" justify="end">
                  <Button type="circle" icon="heart" />
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Col span={18}>
              <Row type="flex" justify="start">
                <h2>{listing.title}</h2>
              </Row>
            </Col>
            <Col span={6}>
              <Row type="flex" justify="end">
                <h2>Rs. {listing.price}</h2>
              </Row>
            </Col>
          </Col>
          <Col span={24}>
            <span>{listing.category}</span>
          </Col>
          <Col span={24}>
            <Rate disabled defaultValue={listing.rating} /> {`(${listing.rating * 2})`}
          </Col>
          <Col span={24}>
            <p>{listing.description}</p>
          </Col>
          {preOrd && <PreOrderComponent visible={preOrd} handleVisible={() => setPreOrd(false)} info="Flavour info" />}
          <Col span={24} style={{ padding: '45px' }} />
        </Row>
      </PageLayout>
      <AddToCart />
    </>
  );
};

ListingDetailsView.propTypes = {
  listing: PropTypes.object,
  history: PropTypes.object
};

// const ListingDetailsViewWithFormik = withFormik({
//   enableReinitialize: true,
//   mapPropsToValues: props => ({
//     weight: '',
//     flavour: ''
//   }),
//   handleSubmit(values, { props: { onSubmit } }) {
//     console.log('values1', values);
//     // onSubmit();
//   },
//   validate: values => validate(values, ListingDetailsViewFormSchema),
//   displayName: 'PasswordChangeModalForm' // helps with React DevTools
// });

export default // ListingDetailsViewWithFormik(
ListingDetailsView;
// );
