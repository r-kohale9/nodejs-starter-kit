import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';

const NavLinkWithI18n = translate('demo')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/demo" className="nav-link" activeClassName="active">
    {t('demo:navLink')}
  </NavLink>
));

const NavLinkAdminWithI18n = translate('review')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/demo/promocode" className="nav-link" activeClassName="active">
    {t('demo:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/demo" component={loadable(() => import('./containers/Demo').then(c => c.default))} />,
    <Route
      exact
      path="/demo/forgotpassword"
      component={loadable(() => import('./containers/PasswordReset').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/home"
      component={loadable(() => import('./containers/ListingCatalogue').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/listing-detail/:id"
      component={loadable(() => import('./containers/ListingDetails').then(c => c.default))}
    />,
    <Route exact path="/demo/baker" component={loadable(() => import('./containers/Baker').then(c => c.default))} />,
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
    <Route
      exact
      path="/demo/promocodes"
      component={loadable(() => import('./containers/Promocodes').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/checkout-cart"
      component={loadable(() => import('./containers/CheckoutCart').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/checkout-order"
      component={loadable(() => import('./containers/CheckoutOrder').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/checkout-status"
      component={loadable(() => import('./containers/CheckoutStatus').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/favorites"
      component={loadable(() => import('./containers/Favorites').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/filters"
      component={loadable(() => import('./containers/Filters').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/contact"
      component={loadable(() => import('./containers/Contact').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/reviews"
      component={loadable(() => import('./containers/Reviews').then(c => c.default))}
    />,
    <Route
      exact
      path="/demo/profile"
      component={loadable(() => import('./containers/Profile').then(c => c.default))}
    />,

    // admin panel
    <AuthRoute
      exact
      role={['admin']}
      path="/demo/promocode"
      component={loadable(() => import('./containers/PromoCodes.web').then(c => c.default))}
    />,
    <Route
      exact
      path="/new/promocode"
      component={loadable(() => import('./containers/AddPromoCode').then(c => c.default))}
    />,
    <Route
      exact
      path="/edit/promocode/:id"
      component={loadable(() => import('./containers/EditPromoCode').then(c => c.default))}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key="/listings">
        <NavLinkAdminWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItem: [
    <MenuItem key="/demo">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'demo', resources }]
});
