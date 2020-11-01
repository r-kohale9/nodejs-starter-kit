import React from 'react';
import PropTypes from 'prop-types';
import { ReadOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import MenuItem from './MenuItem';

export default class LanguagePicker extends React.Component {
  render() {
    const { i18n } = this.props;
    const languages = Object.keys(i18n.store.data);

    return (
      <MenuItem className="ant-menu-item language-picker-nav">
        {languages.length > 1 && (
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => this.props.i18n.changeLanguage(key)} mode="verticle" theme="dark">
                {Object.keys(this.props.i18n.store.data).map(lang => (
                  <Menu.Item key={lang}>{lang.slice(0, 2).toUpperCase()}</Menu.Item>
                ))}
              </Menu>
            }
            trigger={['hover']}
          >
            <div style={{ marginLeft: '8px' }}>
              <ReadOutlined /> {this.props.i18n.language.slice(0, 2).toUpperCase()}{' '}
            </div>
          </Dropdown>
        )}
      </MenuItem>
    );
  }
}

LanguagePicker.propTypes = {
  i18n: PropTypes.object.isRequired
};
