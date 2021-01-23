import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { Row, Col, /* Heading, Icon, */ PageLayout /* MetaTags, AddButton */ } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

// import ROUTES from '../routes';
// import SubjectsFilterComponent from './SubjectsFilterComponent';
import SubjectsListComponent from './SubjectsListComponent';

const SubjectsView = props => {
  const { t } = props;

  return (
    <PageLayout>
      {/* <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} /> */}

      <Row>
        <Col lg={22} md={20} xs={24}>
          {/* <Heading type="2">
            <Icon type="ProfileOutlined" />
            &nbsp;
            {t('subject.subTitle')}
          </Heading> */}
          <h2>Subjects</h2>
        </Col>
        <Col lg={0} md={0} xs={24}>
          <br />
        </Col>
        <Col lg={2} md={4} xs={24} align="right">
          <Link to={'/question/subject/add'}>
            <Button>{t('subject.btn.add')}</Button>
          </Link>
          {/* <Link to={ROUTES.add}>
            <AddButton>{t('subject.btn.add')}</AddButton>
          </Link> */}
        </Col>
      </Row>
      <hr />
      {/* <SubjectsFilterComponent showIsActive={true} {...props} />
      <hr /> */}
      <SubjectsListComponent {...props} />
    </PageLayout>
  );
};

SubjectsView.propTypes = {
  t: PropTypes.func
};

export default SubjectsView;
