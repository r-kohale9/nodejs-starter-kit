import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { PageLayout, Result, Button } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { HOME_ROUTES } from '@gqlapp/home-client-react';

export interface NotAuthorizedProps {
  t: TranslateFunction;
  //
}

const NotAuthorized: React.FC<NotAuthorizedProps> = ({ /* staticContext = {}, */ t }) => {
  // staticContext.notAuthorized = true;
  return (
    <PageLayout>
      <div className={'HVCenter'}>
        <Helmet
          title={`${settings.app.name} - ${t('title')}`}
          meta={[
            {
              name: 'description',
              content: `${settings.app.name} - ${t('meta')}`
            }
          ]}
        />
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link to={HOME_ROUTES.home}>
              <Button color="primary">Back Home</Button>
            </Link>
          }
        />
      </div>
    </PageLayout>
  );
};

export default translate('notFound')(NotAuthorized);
