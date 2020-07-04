import React from 'react';
import { TabBar } from 'antd-mobile';
import { PropTypes } from 'prop-types';
import HomeIsActive from '../Icons/homeinactive.svg';
import HomeActive from '../Icons/homeactive.svg';
import CartIsActive from '../Icons/cartinactive.svg';
import CartActive from '../Icons/cartactive.svg';
import FavoritesIsActive from '../Icons/heartinactive.svg';
import FavoritesActive from '../Icons/heartactive.svg';
import ProfileIsActive from '../Icons/profileinactive.svg';
import ProfileActive from '../Icons/profileactive.svg';

const MenuBar = props => {
  const { history, selectedTab } = props;

  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        bottom: 0,
        zIndex: '2'
      }}
    >
      <TabBar unselectedTintColor="#9B9B9B" tintColor="#FC4C4C" barTintColor="white">
        <TabBar.Item
          title="Home"
          key="Home"
          icon={<img src={HomeIsActive} alt="" />}
          selectedIcon={<img src={HomeActive} alt="" />}
          selected={selectedTab === 'HOME'}
          onPress={() => history.push('/demo/home')}
        />
        <TabBar.Item
          icon={<img src={CartIsActive} alt="" />}
          selectedIcon={<img src={CartActive} alt="" />}
          title="Cart"
          key="Cart"
          selected={selectedTab === 'CART'}
          onPress={() => history.push('/demo/checkout-cart')}
        />
        <TabBar.Item
          icon={<img src={FavoritesIsActive} alt="" />}
          selectedIcon={<img src={FavoritesActive} alt="" />}
          title="Favorites"
          key="Favorites"
          selected={selectedTab === 'FAVORITES'}
          onPress={() => history.push('/demo/favorites')}
        />
        <TabBar.Item
          icon={<img src={ProfileIsActive} alt="" />}
          selectedIcon={<img src={ProfileActive} alt="" />}
          title="Profile"
          key="Profile"
          selected={selectedTab === 'PROFILE'}
          onPress={() => history.push('/demo/profile')}
        />
      </TabBar>
    </div>
  );
};

MenuBar.propTypes = {
  history: PropTypes.object,
  selectedTab: PropTypes.string
};

export default MenuBar;
