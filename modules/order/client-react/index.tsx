import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import loadable from '@loadable/component';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { Icon, MenuItem, Spinner, SubMenu } from '@gqlapp/look-client-react';
import { AuthRoute, IfLoggedIn, USER_ROUTES } from '@gqlapp/user-client-react';
import { PLATFORM_TYPE_OBJECT } from '@gqlapp/setting-common';
import { PlatformType } from '@gqlapp/setting-client-react/containers/PlatformType';
import { UserRoleObject } from '@gqlapp/user-common/';
import { default as PNF_ROUTES } from '@gqlapp/page-not-found-client-react/routes';

import resolvers from './resolvers';
import resources from './locales';
import ROUTES from './routes';
import NavItemCart from './containers/NavItemCart.web';

export { default as ORDER_ROUTES } from './routes';

const NavLinkOrdersWithI18n = translate('order')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    <Icon type="FileOutlined" />
    {'Orders'}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      path={ROUTES.adminPanel}
      redirect={PNF_ROUTES.notAuthorized}
      role={[UserRoleObject.admin]}
      component={loadable(() => import('./containers/Orders.web').then(c => c.default), { fallback: <Spinner /> })}
    />,

    <Route
      exact
      path={ROUTES.order}
      component={loadable(() => import('./containers/Order').then(c => c.default), { fallback: <Spinner /> })}
    />,

    <Route
      exact
      path={ROUTES.orderDetail}
      component={loadable(() => import('./containers/OrderDetails.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,

    <AuthRoute
      exact
      redirect={PNF_ROUTES.notAuthorized}
      role={[UserRoleObject.admin, UserRoleObject.user]}
      path={ROUTES.myOrder}
      component={loadable(() => import('./containers/MyOrder').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      exact
      redirect={PNF_ROUTES.notAuthorized}
      role={[UserRoleObject.admin, UserRoleObject.user]}
      path={ROUTES.myDelivery}
      component={loadable(() => import('./containers/MyDelivery').then(c => c.default), { fallback: <Spinner /> })}
    />,

    // Checkout
    <AuthRoute
      exact
      redirect={USER_ROUTES.profile}
      role={[UserRoleObject.admin, UserRoleObject.user]}
      path={ROUTES.checkoutCart}
      component={loadable(() => import('./containers/CheckoutCart.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <AuthRoute
      exact
      redirect={USER_ROUTES.profile}
      role={[UserRoleObject.admin, UserRoleObject.user]}
      path={ROUTES.checkoutBill}
      component={loadable(() => import('./containers/CheckoutBill.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <AuthRoute
      exact
      redirect={USER_ROUTES.profile}
      role={[UserRoleObject.admin, UserRoleObject.user]}
      path={ROUTES.checkoutOrder}
      component={loadable(() => import('./containers/CheckoutOrder.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />
  ],
  navItem: [
    <IfLoggedIn key={ROUTES.checkoutCart}>
      <MenuItem>
        <NavItemCart />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemUser: [
    <SubMenu
      key={ROUTES.order}
      title={
        <>
          <Icon type="SolutionOutlined" /> Order
        </>
      }
    >
      <MenuItem className="ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
        <NavLink to={ROUTES.myOrder} className="nav-link" activeClassName="active">
          <Icon type="FileOutlined" />
          {'My Orders'}
        </NavLink>
      </MenuItem>
      <PlatformType
        type={PLATFORM_TYPE_OBJECT.multiVendor}
        elseComponent={
          <IfLoggedIn role={UserRoleObject.admin}>
            <MenuItem className="ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
              <NavLink to={ROUTES.myDelivery} className="nav-link" activeClassName="active">
                <Icon type="CarOutlined" />
                {'My Deliveries'}
              </NavLink>
            </MenuItem>
          </IfLoggedIn>
        }
      >
        <MenuItem className="ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
          <NavLink to={ROUTES.myDelivery} className="nav-link" activeClassName="active">
            <Icon type="CarOutlined" />
            {'My Deliveries'}
          </NavLink>
        </MenuItem>
      </PlatformType>
    </SubMenu>
  ],
  navItemAdmin: [
    <IfLoggedIn key={ROUTES.adminPanel} role="admin">
      <MenuItem>
        <NavLinkOrdersWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'order', resources }]
});
