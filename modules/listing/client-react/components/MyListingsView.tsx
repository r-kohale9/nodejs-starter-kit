import React from 'react';
import { Link } from 'react-router-dom';

import { Divider, Icon, Row, Col, PageLayout, Heading, MetaTags, Button, Space } from '@gqlapp/look-client-react';
import { MODAL } from '@gqlapp/review-common';
import settings from '@gqlapp/config';

import ROUTES from '../routes';
import ListingItemComponent from './ListingItemComponent';
import RenderCatalogue from './RenderCatalogue';

// types
import { listing_listing as Listing } from '../graphql/__generated__/listing';
import { MyListingsContainerProps } from '../containers/MyListingsContainer';

export interface MyListingsViewProps extends MyListingsContainerProps {
  onDelete: (id: number) => void;
}

const MyListingsView: React.FC<MyListingsViewProps> = props => {
  const { listings, onDelete, history, t, currentUser } = props;

  const renderFunc = (key: number, listing: Listing) => (
    <>
      <ListingItemComponent
        t={t}
        key={key}
        history={history}
        item={listing}
        deleteProduct={onDelete}
        currentUser={currentUser}
        modalName={MODAL[1].value}
        modalId={listing.id}
      />
      <Divider />
    </>
  );

  return (
    <PageLayout>
      <MetaTags title={t('myListings.title')} description={`${settings.app.name} - ${t('myListings.title')})}`} />
      <Row type="flex" align="middle">
        <Col lg={12} md={12} xs={24}>
          <Heading type="2">
            <Icon type="SolutionOutlined" /> &nbsp; {t('myListings.heading')}
          </Heading>
        </Col>
        <Col lg={12} md={12} xs={0} align="right">
          <Space align="center">
            {listings && (
              <h4>{`(showing 1 - ${listings.edges.length} products of ${listings.totalCount} products)`}</h4>
            )}
            <Link to={`${ROUTES.add}`}>
              <Button color="primary">
                <Icon type="PlusOutlined" /> {t('myListings.btn.add')}
              </Button>
            </Link>
          </Space>
        </Col>
        <Col lg={0} md={0} xs={24}>
          <Link to={`${ROUTES.add}`}>
            <Button block color="primary">
              <Icon type="PlusOutlined" /> {t('myListings.btn.add')}
            </Button>
          </Link>
        </Col>
      </Row>
      <Divider style={{ margin: '5px 0px 10px' }} />
      <RenderCatalogue
        layout={'vertical'}
        onDelete={onDelete}
        emptyLink={`${ROUTES.add}`}
        showFilter={true}
        renderFunc={renderFunc}
        {...props}
      />
    </PageLayout>
  );
};

export default MyListingsView;
