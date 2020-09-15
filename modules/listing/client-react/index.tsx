import React from 'react';
import { Menu, Icon } from 'antd';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';

const { SubMenu } = Menu;

import resolvers from './resolvers';
import resources from './locales';
import ROUTES from './routes';

const MyListingsNavItemAccount = () => {
  return (
    <NavLink to={ROUTES.myListing}>
      <div>
        <Icon type="solution" /> {'My Listings'}
      </div>
    </NavLink>
  );
};

const NavLinkMyListingsBookmark = () => {
  return (
    <NavLink to={ROUTES.listingBookmark}>
      <div>
        <Icon type="star" /> {'My Listings Bookmarks'}
      </div>
    </NavLink>
  );
};

const NavLinkMyListingsWithI18n = translate('listing')(({ t }) => (
  <NavLink to={ROUTES.myListing} className=" AccDetItem" activeClassName="AccDetItemSelected">
    <Icon style={{ paddingRight: '5px' }} type="solution" />
    {t('listing:navLinkMyListings')}
  </NavLink>
));

const NavLinkTestWithI18n = translate('listing')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.listingCatalogue} className="nav-link" activeClassName="active">
    {t('listing:navLink')}
  </NavLink>
));

const NavLinkAdminWithI18n = translate('listing')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    {t('listing:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      role={['admin']}
      path={ROUTES.adminPanel}
      component={loadable(() => import('./containers/Listing.web').then(c => c.default))}
    />,

    <Route
      exact
      path={ROUTES.listingCatalogue}
      component={loadable(() => import('./containers/ListingCatalogue.web').then(c => c.default))}
    />,
    <AuthRoute
      redirect="/profile"
      role={['user', 'admin']}
      exact
      path={ROUTES.myListing}
      component={loadable(() => import('./containers/MyListings').then(c => c.default))}
    />,
    <Route
      exact
      path={ROUTES.listingDetail}
      component={loadable(() => import('./containers/ListingDetail').then(c => c.default))}
    />,
    <AuthRoute
      redirect="/profile"
      role={['user', 'admin']}
      exact
      path={ROUTES.listingBookmark}
      component={loadable(() => import('./containers/MyListingBookmarks').then(c => c.default))}
    />,

    <AuthRoute
      exact
      role={['admin', 'user']}
      path={ROUTES.add}
      component={loadable(() => import('./containers/AddListing.web').then(c => c.default))}
    />,
    <AuthRoute
      exact
      role={['admin', 'user']}
      path={ROUTES.edit}
      component={loadable(() => import('./containers/EditListing.web').then(c => c.default))}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key={ROUTES.adminPanel}>
        <NavLinkAdminWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemTest: [
    <MenuItem key={ROUTES.listingCatalogue}>
      <NavLinkTestWithI18n />
    </MenuItem>
  ],
  navItemUser: [
    <IfLoggedIn>
      <SubMenu
        key="/listing"
        title={
          <span>
            <Icon type="solution" />
            <span>Listing</span>
          </span>
        }
      >
        <MenuItem>
          <MyListingsNavItemAccount />
        </MenuItem>
        <MenuItem>
          <NavLinkMyListingsBookmark />
        </MenuItem>
      </SubMenu>
    </IfLoggedIn>
  ],
  navItemAccount: [
    <IfLoggedIn key={ROUTES.myListing}>
      <MenuItem>
        <NavLinkMyListingsWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'listing', resources }]
});