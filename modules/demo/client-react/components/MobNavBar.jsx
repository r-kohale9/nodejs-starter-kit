import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Drawer, Menu, Icon, Row, Col, Layout } from 'antd';
import UserAvatar from '@gqlapp/user-client-react/containers/UserAvatar';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';

import MenuItem from '@gqlapp/look-client-react/ui-antd/components/MenuItem';
import LoggedIn from '@gqlapp/look-client-react/ui-antd/auth/LoggedIn';
import DropDown from '@gqlapp/look-client-react/ui-antd/components/Dropdown';

const ref = { modules: null };

const { Header } = Layout;

export const onAppCreate = async modules => (ref.modules = modules);

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '/'
    };
  }

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { history } = this.props;
    console.log('props', this.props);
    return (
      <ScrollParallax
        location="page-layout"
        className="navbar-parallex"
        animation={{
          playScale: [1, 1.1],
          translateY: this.state.isMobile ? '' : '-40px'
        }}
      >
        <Header className="no-print">
          <Row className="navbar-wrapper">
            <Col span={24}>
              <Row>
                <Col align="left" xs={12} md={12} lg={0}>
                  <Icon
                    onClick={() => history.goBack()}
                    type="left"
                    style={{
                      color: 'black',
                      position: 'absolute',
                      top: '10px',
                      fontSize: '20px'
                    }}
                  />
                </Col>
                {/* <Col xs={0} md={0} lg={2}>
                  <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.props.location.pathname]}
                    mode="horizontal"
                    theme="light"
                    className="navbar-menu"
                  >
                    {__DEV__ && (
                      <MenuItem>
                        <DropDown type="deployment-unit">
                          {ref.modules.navItemsTest}
                          <MenuItem>
                            <a href="/graphiql">GraphiQL</a>
                          </MenuItem>
                        </DropDown>
                      </MenuItem>
                    )}

                    <LoggedIn role="admin">
                      <MenuItem>
                        <DropDown type="safety-certificate">{ref.modules.navItemsAdmin}</DropDown>
                      </MenuItem>
                    </LoggedIn>
                  </Menu>
                </Col> */}

                {/* <Col xs={0} md={0} lg={15} align="right">
                  <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.props.location.pathname]}
                    mode="horizontal"
                    theme="light"
                    style={{ lineHeight: '39px' }}
                  >
                    {ref.modules.navItems}
                    {ref.modules.navItemsRight}

                    <LoggedIn>
                      <MenuItem>
                        <DropDown content={<UserAvatar />} noicon>
                          {ref.modules.navItemsUser}
                        </DropDown>
                      </MenuItem>
                    </LoggedIn>
                  </Menu>
                </Col> */}
                <Col xs={12} md={12} lg={0}>
                  <div
                    // onClick={this.showDrawer}
                    className="navbar-drawer-logo"
                  >
                    <Icon
                      type="search"
                      style={{
                        color: 'black',
                        fontSize: '20px',
                        position: 'absolute',
                        top: '10px',
                        right: '0px'
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
      </ScrollParallax>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object,
  extra: PropTypes.any,
  location: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
};

export default withRouter(NavBar);
