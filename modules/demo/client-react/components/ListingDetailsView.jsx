import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Spin, Row, Col, Rate } from 'antd';
import Slider from 'react-slick';
import { withFormik } from 'formik';

import { required, validate } from '@gqlapp/validation-common-react';

import PageLayout from './PageLayout';
import SelectModal from './SelectModal';
import AddToCart from './AddToCart';
import PreOrderComponent from './PreOrderComponent';
import BookmarkComponent from './BookmarkComponent';

const ListingDetailsViewFormSchema = {
  weight: [required],
  flavour: [required]
};

const ListingDetailsView = props => {
  const {
    flavours,
    currentUser,
    loading,
    handleBookmark,
    weights,
    listing,
    history,
    values,
    setFieldValue,
    handleSubmit,
    isValid
  } = props;
  const { preOrder } = props.location;
  const [preOrd, setPreOrd] = useState(preOrder);

  const settings = {
    infinite: true,
    centreMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  return (
    <>
      <PageLayout history={history} showMenuBar={false} title={listing && listing.title}>
        {!loading && listing ? (
          <Row align="middle" type="flex" justify="space-between">
            <Col span={24}>
              <Slider {...settings}>
                {listing &&
                  listing.listingImages.map(listImg => (
                    <Row align="middle" type="flex" justify="center">
                      <Col span={24}>
                        <img style={{ width: '100%' }} alt="" src={listImg.imageUrl} />
                      </Col>
                    </Row>
                  ))}
              </Slider>
            </Col>
            <Col span={24}>
              <Row type="flex" align="middle" justify="space-between">
                <Col span={10}>
                  <Row type="flex" justify="start">
                    <SelectModal
                      name="weight"
                      title="Weight"
                      fields={weights}
                      value={values.weight}
                      info="Weight info"
                      handleField={setFieldValue}
                    />
                  </Row>
                </Col>
                <Col span={10}>
                  <Row type="flex" justify="center">
                    <SelectModal
                      name="flavour"
                      title="Flavour"
                      fields={flavours}
                      value={values.flavour}
                      info="Flavour info"
                      handleField={setFieldValue}
                    />
                  </Row>
                </Col>
                <Col span={2}>
                  <Row type="flex" justify="end">
                    <BookmarkComponent
                      handleBookmark={() => handleBookmark(listing.id, currentUser.id)}
                      listing={listing}
                      currentUser={currentUser}
                    />
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Col span={18}>
                <Row type="flex" justify="start">
                  <h2>
                    <strong>{listing.title}</strong>
                  </h2>
                </Row>
              </Col>
              <Col span={6}>
                <Row type="flex" justify="end">
                  <h2>
                    <strong>Rs. {listing.listingCost.cost}</strong>
                  </h2>
                </Row>
              </Col>
            </Col>
            <Col span={24}>
              <span>{listing.category}</span>
            </Col>
            <Col span={24}>
              <Rate style={{ fontSize: '15px' }} disabled defaultValue={listing.rating} /> {`(${listing.rating})`}
            </Col>
            <Col span={24}>
              <p>{listing.description}</p>
            </Col>
            {preOrd && (
              <PreOrderComponent visible={preOrd} handleVisible={() => setPreOrd(false)} info="Flavour info" />
            )}
            <Col span={24} style={{ padding: '45px' }} />
          </Row>
        ) : (
          <Spin />
        )}
      </PageLayout>
      <AddToCart onSubmit={() => handleSubmit(values)} disabled={!isValid} />
    </>
  );
};

ListingDetailsView.propTypes = {
  listing: PropTypes.object,
  flavours: PropTypes.array,
  weights: PropTypes.array,
  history: PropTypes.object,
  location: PropTypes.object,
  values: PropTypes.object,
  preOrder: PropTypes.bool,
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  isValid: PropTypes.bool,
  currentUser: PropTypes.object,
  loading: PropTypes.bool,
  handleBookmark: PropTypes.func
};

const ListingDetailsViewWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    listingId: props && props.listing && props.listing.id,
    weight: '',
    flavour: ''
  }),
  handleSubmit(values, { props: { onSubmit } }) {
    onSubmit(values);
  },
  validate: values => validate(values, ListingDetailsViewFormSchema),
  displayName: 'ListingDetailsForm' // helps with React DevTools
});

export default ListingDetailsViewWithFormik(ListingDetailsView);
