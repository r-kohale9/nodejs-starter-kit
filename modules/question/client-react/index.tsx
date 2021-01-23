import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';
import resolvers from './resolvers';

const NavLinkWithI18n = translate('question')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/question/admin" className="nav-link" activeClassName="active">
    Questions
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route
      exact
      path="/question/admin"
      component={loadable(() => import('./containers/QuestionAdmin').then((c) => c.default))}
    />,
    <Route
      exact
      path="/question/detail/:id"
      component={loadable(() => import('./containers/QuestionDetail').then((c) => c.default))}
    />,
    <Route
      exact
      path="/question/edit/:id"
      component={loadable(() => import('./containers/QuestionEdit').then((c) => c.default))}
    />,
    <Route exact path="/question/add" component={loadable(() => import('./containers/QuestionAdd').then((c) => c.default))} />,
    <Route
      exact
      path="/question/subject/add"
      component={loadable(() => import('./containers/SubjectAdd').then((c) => c.default))}
    />,
    <Route
      exact
      path="/question/subject/edit/:id"
      component={loadable(() => import('./containers/SubjectEdit').then((c) => c.default))}
    />,
    <Route
      exact
      path="/question/subject/admin-panel"
      component={loadable(() => import('./containers/Subjects').then((c) => c.default))}
    />,
    <Route
      exact
      path="/question/chapter/add"
      component={loadable(() => import('./containers/ChapterAdd').then((c) => c.default))}
    />,
    <Route
      exact
      path="/question/chapter/edit/:id"
      component={loadable(() => import('./containers/ChapterEdit').then((c) => c.default))}
    />,
    <Route
      exact
      path="/question/topic/add"
      component={loadable(() => import('./containers/TopicAdd').then((c) => c.default))}
    />,
    <Route
      exact
      path="/question/topic/edit/:id"
      component={loadable(() => import('./containers/TopicEdit').then((c) => c.default))}
    />,
  ],
  navItem: [
    <MenuItem key="/question/admin">
      <NavLinkWithI18n />
    </MenuItem>,
  ],
  resolver: [resolvers],
  localization: [{ ns: 'question', resources }],
});
