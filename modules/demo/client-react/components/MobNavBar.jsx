import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon, Row, Col, Layout } from 'antd';
// import UserAvatar from '@gqlapp/user-client-react/containers/UserAvatar';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';

// import MenuItem from '@gqlapp/look-client-react/ui-antd/components/MenuItem';
// import LoggedIn from '@gqlapp/look-client-react/ui-antd/auth/LoggedIn';
// import DropDown from '@gqlapp/look-client-react/ui-antd/components/Dropdown';

const ref = { modules: null };

const { Header } = Layout;

const HeaderMod = styled(Header)`
  &&& {
    height: 100% !important;
    padding: 0 !important;
    width: 100%;
    background: ${props => props.color};
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
`;

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
    const { history, search, title, showMobNav } = this.props;
    return (
      <ScrollParallax
        location="page-layout"
        className="navbar-parallex"
        animation={{
          playScale: [1, 1.1],
          translateY: this.state.isMobile ? '' : '-40px'
        }}
      >
        {console.log('typeof title === undefined', typeof title === 'undefined')}
        <Header className={typeof title === 'undefined' ? 'no-print navbar-background' : 'no-print'}>
          {typeof showMobNav === 'undefined' && (
            <Row className="navbar-wrapper">
              <Col span={24}>
                <Row>
                  <Col align="left" span={2}>
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
                  <Col span={20}>
                    <Row type="flex" align="middle" justify="center">
                      <h3
                        style={{
                          color: 'black',
                          lineHeight: '2.35',
                          fontSize: '18px',
                          letterSpacing: '1px'
                        }}
                      >
                        <strong>{title && title}</strong>
                      </h3>
                    </Row>
                  </Col>
                  <Col span={2}>
                    {search && (
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
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Header>
      </ScrollParallax>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object,
  extra: PropTypes.any,
  location: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  search: PropTypes.bool,
  title: PropTypes.string
};

export default withRouter(NavBar);
