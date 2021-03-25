import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { MODAL } from '@gqlapp/review-common';
import { translate } from '@gqlapp/i18n-client-react';
import {
  FilterLayout,
  Space,
  Icon,
  Form,
  FormItem,
  Option,
  RenderCheckBox,
  Input,
  Col,
  Row,
  RenderSelect
} from '@gqlapp/look-client-react';

import ROUTES from '../routes';

// types
import { ReviewViewProps } from './ReviewsView';

export interface ReviewsFilterViewProps extends ReviewViewProps {
  //
}

const ReviewsFilterView: React.FC<ReviewsFilterViewProps> = props => {
  const {
    filter: { searchText, modalName = '', isActive },
    onSearchTextChange,
    onIsActiveChange,
    onModalNameChange,
    onFiltersRemove,
    t
  } = props;

  return (
    <FilterLayout
      icon={'BookOutlined'}
      addRoute={ROUTES.add}
      title={t('adminPanel.title')}
      // search
      searchTitle={t('adminPanel.filter.field1')}
      searchText={searchText}
      onSearchTextChange={onSearchTextChange}
      // components
      onFiltersRemove={() =>
        onFiltersRemove(
          {
            searchText: '',
            modalName: '',
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
              label={t('adminPanel.filter.field3')}
              inFilter={true}
              checked={isActive}
            />
          </Col>
          <Col lg={8} md={8} xs={24}>
            <Field
              name="modal"
              icon="SafetyCertificateOutlined"
              component={RenderSelect}
              placeholder={t('adminPanel.filter.field2')}
              defaultValue={MODAL[0].value}
              onChange={e => onModalNameChange(e)}
              label={t('adminPanel.filter.field2')}
              style={{ width: '100px' }}
              value={modalName}
              inFilter={true}
              selectStyle={{ width: '100%' }}
            >
              {MODAL.map((m, i) => (
                <Option key={i} value={m.value}>
                  {m.label}
                </Option>
              ))}
            </Field>
          </Col>
          <Col lg={8} md={8} xs={24}>
            {resetBtn}
          </Col>
        </Row>
      )}
    />
  );
};

ReviewsFilterView.propTypes = {
  filter: PropTypes.object.isRequired,
  onIsActiveChange: PropTypes.func.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onModalNameChange: PropTypes.func.isRequired,
  onFiltersRemove: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('review')(ReviewsFilterView);
