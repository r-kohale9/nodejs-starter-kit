import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Heading, Icon, PageLayout, MetaTags, AddButton } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ROUTES from '../routes';
import CategoriesFilterComponent from './CategoriesFilterComponent';
import CategoriesListComponent from './CategoriesListComponent';

// types
import { CategoriesProps } from '../containers/Categories.web';

export interface CategoriesViewProps extends CategoriesProps {
  onToggle: (field: string, value: boolean, id: number) => void;
}

const CategoriesView: React.FC<CategoriesViewProps> = props => {
  const { t } = props;
  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

      <Row>
        <Col lg={22} md={20} xs={24}>
          <Heading type="2">
            <Icon type="ProfileOutlined" />
            &nbsp;
            {t('category.subTitle')}
          </Heading>
        </Col>
        <Col lg={0} md={0} xs={24}>
          <br />
        </Col>
        <Col lg={2} md={4} xs={24} align="right">
          <Link to={ROUTES.add}>
            <AddButton>{t('category.btn.add')}</AddButton>
          </Link>
        </Col>
      </Row>
      <hr />
      <CategoriesFilterComponent {...props} />
      <hr />
      <CategoriesListComponent {...props} />
    </PageLayout>
  );
};

export default CategoriesView;
