import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {
  Row,
  Icon,
  PageLayout,
  Divider,
  Spinner,
  BreadcrumbItem,
  Breadcrumb,
  Title,
  Paragraph,
  Col
} from '@gqlapp/look-client-react';
import CategoryListingsCatalogue from '@gqlapp/listing-client-react/containers/CategoryListingsCatalogue';
import { MODAL } from '@gqlapp/review-common';
// import CategoryItemComponent from '@gqlapp/category-client-react/components/CategoryItemComponent';
import CategoryNavBarComponent from '@gqlapp/category-client-react/containers/CategoryNavBarComponent';

import CategoryCarousel from './CategoryCarousel';

const CategoryCatalogueView = props => {
  const { loading, category, navigation, match } = props;

  return (
    <PageLayout>
      <Col xs={0} md={0} lg={24}>
        <CategoryNavBarComponent filter={{ isActive: true, isNavbar: true, modalName: MODAL[1].value }} />
      </Col>
      <Col xs={24} md={24} lg={0}>
        <CategoryNavBarComponent filter={{ isActive: true, isNavbar: true, modalName: MODAL[1].value }} mobile={true} />
      </Col>
      {loading && <Spinner />}
      {category && (
        <>
          <Breadcrumb>
            <BreadcrumbItem>
              <NavLink to="/">
                <Icon type="HomeOutlined" />
              </NavLink>
            </BreadcrumbItem>
            {category && <BreadcrumbItem>{category.title}</BreadcrumbItem>}
          </Breadcrumb>
          <div style={{ marginTop: '15px' }}>
            <Title level={2}>{category.title}</Title>
            <Paragraph>{category.description}</Paragraph>
          </div>
          {category && category.subCategories && category.subCategories.length !== 0 && (
            <>
              <Divider orientation="left">
                <Title level={3}>Sub Categories</Title>
              </Divider>

              <Row gutter={[24, 24]}>
                {category.subCategories.length > 0 && <CategoryCarousel categories={category.subCategories} />}
                {/* {category.subCategories.length > 0 &&
                  category.subCategories.map((c, idx) => <CategoryItemComponent category={c} idx={idx} />)} */}
              </Row>
            </>
          )}
          <>
            <Divider />
            <CategoryListingsCatalogue match={match} navigation={navigation} />
          </>
        </>
      )}
    </PageLayout>
  );
};

CategoryCatalogueView.propTypes = {
  loading: PropTypes.bool,
  category: PropTypes.object,
  match: PropTypes.object,
  navigation: PropTypes.object
};

export default CategoryCatalogueView;