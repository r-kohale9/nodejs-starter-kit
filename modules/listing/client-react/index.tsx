import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { Icon, MenuItem, Spinner, SubMenu } from '@gqlapp/look-client-react';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/';
import { UserRoleObject } from '@gqlapp/user-common/';
import { PlatformType } from '@gqlapp/setting-client-react/containers/PlatformType';
import { PLATFORM_TYPE_OBJECT } from '@gqlapp/setting-common';
import { default as PNF_ROUTES } from '@gqlapp/page-not-found-client-react/routes';

import resolvers from './resolvers';
import resources from './locales';
import ROUTES from './routes';

export { default as LISTING_ROUTES } from './routes';
export * from './containers';
export * from './components';

// const NavLinkMyListingsWithI18n = translate('listing')(({ t }) => (
//   <NavLink to={ROUTES.myListing} className=" AccDetItem" activeClassName="AccDetItemSelected">
//     <Icon style={{ paddingRight: '5px' }} type="solution" />
//     {t('listing:navLinkMyListings')}
//   </NavLink>
// ));

const NavLinkTestWithI18n = translate('listing')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.listingCatalogue} className="nav-link" activeClassName="active">
    <Icon type="SolutionOutlined" />
    {t('listing:navLink')}
  </NavLink>
));

const NavLinkAdminWithI18n = translate('listing')(({ t }: { t: TranslateFunction }) => (
  <NavLink to={ROUTES.adminPanel} className="nav-link" activeClassName="active">
    <Icon type="SolutionOutlined" />
    {t('listing:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      redirect={PNF_ROUTES.notAuthorized}
      role={[UserRoleObject.admin]}
      path={ROUTES.adminPanel}
      component={loadable(() => import('./containers/Listing.web').then(c => c.default), { fallback: <Spinner /> })}
    />,

    <Route
      exact
      path={ROUTES.listingCatalogue}
      component={loadable(() => import('./containers/ListingCatalogue.web').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <Route
      exact
      path={ROUTES.categoryCatalogue}
      component={loadable(() => import('./containers/CategoryCatalogue').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <Route
      exact
      path={ROUTES.listingReview}
      component={loadable(() => import('./containers/ListingReview').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,
    <AuthRoute
      redirect={PNF_ROUTES.notAuthorized}
      role={[UserRoleObject.user, UserRoleObject.admin]}
      exact
      path={ROUTES.myListing}
      component={loadable(() => import('./containers/MyListings').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <Route
      exact
      path={ROUTES.listingDetail}
      component={loadable(() => import('./containers/ListingDetail').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      redirect={PNF_ROUTES.notAuthorized}
      role={[UserRoleObject.user, UserRoleObject.admin]}
      exact
      path={ROUTES.listingBookmark}
      component={loadable(() => import('./containers/MyListingBookmarks').then(c => c.default), {
        fallback: <Spinner />
      })}
    />,

    <AuthRoute
      exact
      redirect={PNF_ROUTES.notAuthorized}
      role={[UserRoleObject.user, UserRoleObject.admin]}
      path={ROUTES.add}
      component={loadable(() => import('./containers/AddListing.web').then(c => c.default), { fallback: <Spinner /> })}
    />,
    <AuthRoute
      exact
      redirect={PNF_ROUTES.notAuthorized}
      role={[UserRoleObject.user, UserRoleObject.admin]}
      path={ROUTES.edit}
      component={loadable(() => import('./containers/EditListing.web').then(c => c.default), { fallback: <Spinner /> })}
    />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key={ROUTES.adminPanel}>
        <NavLinkAdminWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  // navItemTest: [
  //   <MenuItem key={ROUTES.listingCatalogue}>
  //     <NavLinkTestWithI18n />
  //   </MenuItem>
  // ],
  navItemBrowse: [
    <MenuItem key={ROUTES.listingCatalogue}>
      <NavLinkTestWithI18n />
    </MenuItem>
  ],
  navItemUser: [
    <SubMenu
      key={ROUTES.listing}
      title={
        <>
          <Icon type="SolutionOutlined" />
          Listing
        </>
      }
    >
      <PlatformType
        type={PLATFORM_TYPE_OBJECT.multiVendor}
        elseComponent={
          <IfLoggedIn role={UserRoleObject.admin}>
            <MenuItem className="ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
              <NavLink to={ROUTES.add}>
                <Icon type="SolutionOutlined" />
                {'Create listing'}
              </NavLink>
            </MenuItem>
          </IfLoggedIn>
        }
      >
        <MenuItem className="ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
          <NavLink to={ROUTES.add}>
            <Icon type="SolutionOutlined" />
            {'Create listing'}
          </NavLink>
        </MenuItem>
      </PlatformType>
      <MenuItem>
        <NavLink to={ROUTES.listingBookmark}>
          <Icon type="StarOutlined" />
          {'My Bookmarks'}
        </NavLink>
      </MenuItem>
      <PlatformType
        type={PLATFORM_TYPE_OBJECT.multiVendor}
        elseComponent={
          <IfLoggedIn role={UserRoleObject.admin}>
            <MenuItem className="ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
              <NavLink to={ROUTES.myListing}>
                <Icon type="SolutionOutlined" />
                {'My Listings'}
              </NavLink>
            </MenuItem>
          </IfLoggedIn>
        }
      >
        <MenuItem className="ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
          <NavLink to={ROUTES.myListing}>
            <Icon type="SolutionOutlined" />
            {'My Listings'}
          </NavLink>
        </MenuItem>
      </PlatformType>
    </SubMenu>
  ],
  // navItemAccount: [
  //   <IfLoggedIn key={ROUTES.myListing}>
  //     <MenuItem>
  //       <NavLinkMyListingsWithI18n />
  //     </MenuItem>
  //   </IfLoggedIn>
  // ],
  resolver: [resolvers],
  localization: [{ ns: 'listing', resources }]
});
