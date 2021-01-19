import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';
import resolvers from "./resolvers";

const NavLinkWithI18n = translate('question')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/question/admin" className="nav-link" activeClassName="active">
    {t('question:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [<Route exact path="/question/admin" component={loadable(() => import('./containers/QuestionAdmin').then(c => c.default))} />],
  navItem: [
    <MenuItem key="/question/admin">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'question', resources }]
});
