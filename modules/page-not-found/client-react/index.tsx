import React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';

import ClientModule from '@gqlapp/module-client-react';
import { Spinner } from '@gqlapp/look-client-react';

import ROUTES from './routes';
import resources from './locales';

export default new ClientModule({
  route: [
    <Route
      path={ROUTES.notAuthorized}
      component={loadable(() => import('./containers/NotAuthorized').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      component={loadable(() => import('./containers/PageNotFound').then(c => c.default), { fallback: <Spinner /> })}
    />
  ],
  localization: [{ ns: 'notFound', resources }]
});
