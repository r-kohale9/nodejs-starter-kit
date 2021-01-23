import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import {
  Row,
  Col,
  Button,
  RenderCheckBox,
  Option,
  // RenderUpload,
  RenderSelect,
  // Icon,
  Card,
  RenderField,
  Form,
} from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

import SubjectAutoCompleteComponent from './SubjectAutoCompleteComponent';
import ChapterAutoCompleteComponent from './ChapterAutoCompleteComponent';

const TopicFormSchema = {
  title: [required],
};

const TopicFormComponent = (props) => {
  const { cardTitle, handleSubmit, values, t, setFieldValue } = props;
  const [load, setLoad] = useState(false);
  const chapterTitle = props.topic && props.topic.chapter && props.topic.chapter.title;
  const subjectTitle = props.topic && props.topic.chapter && props.topic.chapter.subject && props.topic.chapter.subject.title;

  console.log('props', props.topic.chapter);
  return (
    <Card
      title={
        <>
          <h3>
            {/* <Icon type="SolutionOutlined" /> */}
            &nbsp;
            <strong>{cardTitle}</strong>
          </h3>
          <div align="center">
            <div key="line" className="title-line-wrapper" align="left">
              <div
                className="title-line"
                // style={{ transform: "translateX(-64px)" }}
              />
            </div>
          </div>
        </>
      }
    >
      {/* {console.log(values)} */}
      <Form onSubmit={handleSubmit} align="left">
        <Row type="flex" gutter={24}>
          <Col md={12} xs={24} align="left">
            <Field
              name="title"
              icon="FontSizeOutlined"
              component={RenderField}
              placeholder={t('topicForm.title')}
              type="text"
              label={t('topicForm.title')}
              value={values.title}
            />
          </Col>
          <Col md={12} xs={24} align="left">
            <SubjectAutoCompleteComponent
              name="chapter"
              label={t('topicForm.chapter')}
              defaultValue={chapterTitle}
              value={values.subjectId}
              setValue={(e) => setFieldValue('subjectId', e)}
            />
            {values.subjectId && (
              <ChapterAutoCompleteComponent
                name="chapter"
                label={t('topicForm.chapter')}
                defaultValue={subjectTitle}
                value={values.chapterId}
                subjectId={values.subjectId}
                filter={{}}
                setValue={(e) => setFieldValue('chapterId', e)}
              />
            )}
          </Col>
          <Col md={12} xs={24} align="left">
            <Field
              name="description"
              icon="FileOutlined"
              component={RenderField}
              placeholder={t('topicForm.description')}
              type="textarea"
              label={t('topicForm.description')}
              value={values.description}
            />
          </Col>
          <Col md={12} xs={24} align="left">
            <Row type="flex">
              <Col md={12} xs={24} align="left">
                <Field
                  name="isActive"
                  component={RenderCheckBox}
                  type="checkbox"
                  label={t('topicForm.isActive')}
                  checked={values.isActive}
                />
              </Col>
              <Col md={12} xs={24} align="left"></Col>
            </Row>
          </Col>
          <Col span={24} align="right">
            <Button color="primary" type="submit" disabled={load}>
              {t('topicForm.btn.submit')}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

TopicFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  t: PropTypes.func,
  cardTitle: PropTypes.string,
  showAdditional: PropTypes.bool,
};

const TopicWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      id: (props.topic && props.topic.id) || null,
      title: (props.topic && props.topic.title) || '',
      description: (props.topic && props.topic.description) || '',
      subjectId: (props.topic && props.topic.chapter && props.topic.chapter.subject && props.topic.chapter.subject.id) || '',
      chapterId: (props.topic && props.topic.chapter && props.topic.chapter.id) || '',
      isActive: props.listing && (props.listing.isActive ? true : false),
      // subCategories: (props.topic && props.topic.subCategories) || [],
    };
  },
  async handleSubmit(
    values,
    {
      props: { onSubmit },
    }
  ) {
    await onSubmit(values);
  },
  validate: (values) => validate(values, TopicFormSchema),
  displayName: 'Topic Form', // helps with React DevTools
});

export default TopicWithFormik(TopicFormComponent);
