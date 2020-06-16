import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('demo')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/demo/payment-methods" className="nav-link" activeClassName="active">
    {t('demo:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/demo" component={loadable(() => import('./containers/Demo').then(c => c.default))} />,
    <Route
      exact
      path="/forgotpassword"
      component={loadable(() => import('./containers/PasswordReset').then(c => c.default))}
    />,
    <Route
      exact
      path="/home"
      component={loadable(() => import('./containers/ListingCatalogue').then(c => c.default))}
    />,
    <Route exact path="/baker" component={loadable(() => import('./containers/Baker').then(c => c.default))} />,
    <Route exact path="/demo/login" component={loadable(() => import('./containers/Login').then(c => c.default))} />,
    <Route
      exact
      path="/demo/my-orders"
      component={loadable(() => import('./containers/MyOrders').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/order-details/:id"
      component={loadable(() => import('./containers/OrderDetails').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/shipping-address"
      component={loadable(() => import('./containers/ShippingAddress').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/edit-shipping-address/:id"
      component={loadable(() => import('./containers/EditShippingAddress').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/add-shipping-address"
      component={loadable(() => import('./containers/AddShippingAddress').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/payment-methods"
      component={loadable(() => import('./containers/PaymentMethods').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/settings"
      component={loadable(() => import('./containers/Settings').then(c => c.default))}
    />,
  ],
  navItem: [
    <MenuItem key="/demo">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'demo', resources }]
});
