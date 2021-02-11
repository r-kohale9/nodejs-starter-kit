import React from 'react';
import PropTypes from 'prop-types';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import {
  FilterLayout,
  Space,
  Icon,
  FormItem,
  Select,
  Option,
  RenderCheckBox,
  Row,
  Col
} from '@gqlapp/look-client-react';

import ROUTES from '../routes';

// types
import { UsersProps } from '../containers/Users.web';

export interface UsersFilterViewProps extends UsersProps {
  //
}

const UsersFilterView: React.FC<UsersFilterViewProps> = props => {
  const {
    filter: { searchText, role, isActive },
    onSearchTextChange,
    onRoleChange,
    onFiltersRemove,
    onIsActiveChange,
    t
  } = props;

  return (
    <FilterLayout
      icon={'UserOutlined'}
      addRoute={ROUTES.add}
      title={t('users.list.title')}
      // search
      searchTitle={t('users.list.item.search')}
      searchText={searchText}
      onSearchTextChange={onSearchTextChange}
      // components
      onFiltersRemove={() =>
        onFiltersRemove(
          {
            searchText: '',
            role: '',
            isActive: true
          },
          { column: '', order: '' }
        )
      }
      expandChildren={(resetBtn: JSX.Element) => (
        <Row gutter={24}>
          <Col lg={8} md={8} xs={24}>
            <Field
              name="isActive"
              icon={'CheckCircleOutlined'}
              component={RenderCheckBox}
              type="checkbox"
              onChange={() => onIsActiveChange(!isActive)}
              label={t('users.list.item.active')}
              inFilter={true}
              checked={isActive}
            />
          </Col>
          <Col lg={8} md={8} xs={24}>
            <FormItem
              label={
                <Space align="center">
                  <Icon type="UserSwitchOutlined" />
                  {t('users.list.item.role.label')}
                </Space>
              }
              style={{ width: '100%' }}
            >
              <Select name="role" defaultValue={role} style={{ width: '100%' }} onChange={e => onRoleChange(e)}>
                <Option key={1} value="">
                  {t('users.list.item.role.all')}
                </Option>
                <Option key={2} value="user">
                  {t('users.list.item.role.user')}
                </Option>
                <Option key={3} value="admin">
                  {t('users.list.item.role.admin')}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col lg={8} md={8} xs={24}>
            {resetBtn}
          </Col>
        </Row>
      )}
    />
  );
};

UsersFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onRoleChange: PropTypes.func.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('user')(UsersFilterView);
