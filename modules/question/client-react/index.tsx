import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('question')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/question" className="nav-link" activeClassName="active">
    {t('question:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [<Route exact path="/question" component={loadable(() => import('./containers/Question').then(c => c.default))} />],
  navItem: [
    <MenuItem key="/question">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'question', resources }]
});
