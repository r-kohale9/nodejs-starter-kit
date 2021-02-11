import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
import {
  Icon,
  MetaTags,
  PageLayout,
  Heading,
  Divider,
  EmptyComponent,
  SuggestedListComponent,
  Spinner,
  Col,
  Row
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { CategoryNavBarComponent } from '@gqlapp/category-client-react';
import { MODAL } from '@gqlapp/review-common';

import RelatedCardComponent from './RelatedCardComponent';
import ListingFilterComponent from './ListingFilterComponent.web';

// types
import { ListingsCatalogueProps } from '../containers/ListingCatalogue.web';
import { listing_listing as Listing } from '../graphql/__generated__/listing';
// import { listings_listings as Listings } from '../graphql/__generated__/listings';

export interface ListingCatalogueViewProps extends ListingsCatalogueProps {
  title: string;
  onDelete: (id: number) => void;
  emptyLink: string;
  showFilter: boolean;
}

const ListingCatalogueView: React.FC<ListingCatalogueViewProps> = props => {
  const {
    t,
    loading,
    listings,
    history,
    title,
    currentUser,
    showFilter,
    getCart,
    cartLoading,
    onDelete,
    emptyLink,
    loadData
  } = props;

  const renderFunc = (key: number, listing: Listing) => {
    const cartItemArray =
      getCart && getCart.orderDetails && getCart.orderDetails.length > 0
        ? getCart.orderDetails.filter(oD => oD.modalId === listing.id)
        : [];
    return (
      <RelatedCardComponent
        key={key}
        listing={listing}
        history={history}
        modalName={MODAL[1].value}
        modalId={listing.id}
        currentUser={currentUser}
        inCart={cartItemArray.length === 0}
        loading={cartLoading}
        onDelete={() => onDelete(cartItemArray[0].id)}
      />
    );
  };
  const RenderListings = ({ layout }: { layout: string }) => (
    <div>
      {/* <SuggestedListComponent<Listings>
        endText={'listing'}
        grid={
          layout === 'vertical' && {
            gutter: 18,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5,
          }
        }
        items={listings}
        renderFunc={renderFunc}
        loadData={loadData}
        // itemName={'listings'}
      /> */}
      <SuggestedListComponent
        endText={'listing'}
        grid={
          layout === 'vertical' && {
            gutter: 18,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5
          }
        }
        items={listings}
        renderFunc={renderFunc}
        loadData={loadData}
      />
    </div>
  );

  const renderChildren = (layout = 'horizontal') => {
    const span =
      layout === 'vertical'
        ? {
            spanFilter: { lg: 6, md: 8, sm: 24 },
            spanContent: { lg: 18, md: 16, sm: 24 }
          }
        : {
            spanFilter: { span: 24 },
            spanContent: { span: 24 }
          };
    return (
      <Row type="flex" gutter={[24, 24]}>
        <Col {...span.spanFilter}>
          {layout !== 'vertical' && <br />}
          {showFilter && (
            <ListingFilterComponent
              layout={layout}
              showIsActive={false}
              filter={{ isActive: true }}
              orderBy={{}}
              {...props}
            />
          )}
        </Col>
        <Col {...span.spanContent}>
          {loading && <Spinner />}
          {!loading && listings && listings.totalCount ? (
            <RenderListings layout={layout} />
          ) : !loading ? (
            <EmptyComponent description={t('listing.noListingsMsg')} emptyLink={emptyLink} />
          ) : null}
        </Col>
      </Row>
    );
  };

  return (
    <PageLayout>
      <MetaTags title={t('list.title')} description={`${settings.app.name} - ${t('list.meta')}`} />
      <CategoryNavBarComponent filter={{ isActive: true, isNavbar: true, modalName: MODAL[1].value }} />
      <Row type="flex" align="middle">
        <Col lg={12} md={12} xs={24}>
          <Heading type="2">
            <Icon type="SolutionOutlined" /> &nbsp; {title}
          </Heading>
        </Col>
        <Col lg={12} md={12} xs={0}>
          <Row justify="end">
            {listings && (
              <h4>{`(showing 1 - ${listings.edges.length} products of ${listings.totalCount} products)`}</h4>
            )}
          </Row>
        </Col>
      </Row>
      <Divider style={{ margin: '5px 0px 10px' }} />
      {renderChildren('vertical')}
      {/* {renderChildren()} */}
    </PageLayout>
  );
};

export default translate('listing')(ListingCatalogueView);
