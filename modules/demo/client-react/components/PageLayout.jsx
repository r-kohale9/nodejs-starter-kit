import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Layout, BackTop, Button, Tooltip } from 'antd';
import { enquireScreen } from 'enquire-js';

import MenuBar from '@gqlapp/demo-client-react/components/MenuBar';
import NavBar from '@gqlapp/look-client-react/ui-antd/components/NavBar';
import Footer from '@gqlapp/look-client-react/ui-antd/components/Footer';

import styles from '@gqlapp/look-client-react/ui-antd/styles/index.less';

import MobNavBar from './MobNavBar';

const layoutTypes = [
  {
    type: null,
    outerClassName: 'content-layout',
    innerClassName: null
  },
  {
    type: 'home',
    outerClassName: 'home-content-layout',
    innerClassName: null
  },
  {
    type: 'forms',
    outerClassName: 'form-layout-outer',
    innerClassName: 'form-content-layout'
  }
];

const { Content } = Layout;
let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '/',
      isMobile,
      show: true //!location.port, ToDo - find a better approach this
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen(b => {
      this.setState({ isMobile: !!b });
    });
    // ToDo - find a better approach for below statement
    // if (true) {

    setTimeout(() => {
      this.setState({
        show: true
      });
    }, 500);
    // }
  }
  render() {
    const { children, navBar, type, selectedTab, history, showMenuBar, showMobNav, search, title } = this.props;
    const contentStyle = layoutTypes.filter(item => item.type === type);
    const renderContent = () => {
      return (
        <Content
          id="content"
          className={
            (contentStyle.length !== 0 && contentStyle[0].outerClassName) ||
            (typeof title === 'undefined' ? 'content-layout content-layout-white' : 'content-layout')
          }
        >
          {children}
        </Content>
      );
    };
    return (
      <Layout id="page-layout">
        {navBar !== false && !this.state.isMobile && <NavBar isMobile={this.state.isMobile} />}
        {navBar !== false && this.state.isMobile && (
          <MobNavBar history={history} showMobNav={showMobNav} search={search} title={title} />
        )}
        {__SERVER__ && __DEV__ && (
          <Helmet>
            <style type="text/css">{styles._getCss()}</style>
          </Helmet>
        )}
        {this.state.isMobile && showMenuBar && <MenuBar selectedTab={selectedTab} history={history} />}
        {renderContent()}
        <BackTop>
          <Tooltip placement="left" title="Back to Top" autoAdjustOverflow={true}>
            <Button icon="arrow-up" type="primary" shape="circle-outline" size="large" />
          </Tooltip>
        </BackTop>
        {!this.state.isMobile && <Footer />}
      </Layout>
    );
  }
}

PageLayout.propTypes = {
  history: PropTypes.object,
  children: PropTypes.node,
  showMenuBar: PropTypes.bool,
  showMobNav: PropTypes.bool,
  search: PropTypes.bool,
  navBar: PropTypes.bool,
  title: PropTypes.string,
  selectedTab: PropTypes.string,
  type: PropTypes.string
};

export default PageLayout;
