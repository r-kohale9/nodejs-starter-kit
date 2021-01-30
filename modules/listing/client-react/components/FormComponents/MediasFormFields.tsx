import React from 'react';
import { FieldArray } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { IMG_ASPECT } from '@gqlapp/listing-common';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import {
  Space,
  Row,
  Col,
  FormItem,
  Button,
  Icon,
  AddButton,
  SubmitButton,
  RenderField,
  /* RenderUploadMultiple, */
  RenderUploadMultipleWithCrop
} from '@gqlapp/look-client-react';
// types
import { FormValues } from '../ListingFormComponent.web';
import { ListingMediumInput } from '../../../../../packages/server/__generated__/globalTypes';

const VIDEO = 'video';

export interface MediasFormFieldsProps {
  t: TranslateFunction;
  setStep: (s: number) => void;
  values: FormValues;
  setFieldValue: {
    (
      field:
        | 'id'
        | 'userId'
        | 'categoryId'
        | 'title'
        | 'description'
        | 'sku'
        | 'brand'
        | 'listingFlags'
        | 'listingOptions'
        | 'listingMedia'
        | 'listingDetail'
        | 'listingHighlight'
        | 'listingCostArray'
        | 'isActive',
      value: any,
      shouldValidate?: boolean
    ): void;
    (field: string, value: any): void;
  };
  videos: ListingMediumInput[];
  load: boolean;
  setLoad: (l: boolean) => void;
}

const MediasFormFields: React.FC<MediasFormFieldsProps> = props => {
  const { values, t, setFieldValue, videos, setLoad, load, setStep } = props;

  let formItemsVideos = null;

  if (videos.length > 0) {
    formItemsVideos = videos.map((v, index) => (
      <FormItem required={false} key={index} style={{ margin: '0 5px' }}>
        <Row type="flex" align="middle">
          <Col span={20}>
            <FormItem
              //  style={{ display: 'inline-block', margin: '0px 5px' }}
              key={index}
            >
              <Field
                name={`listingMedia.video[${index}].url`}
                icon={'VideoCameraOutlined'}
                component={RenderField}
                placeholder={t('listingForm.videoUrl')}
                type="text"
                label={t('listingForm.videoUrl')}
                value={v.url}
                key={index}
              />
            </FormItem>
          </Col>
          <Col span={4} align="right">
            <Button
              color={'danger'}
              shape="circle"
              icon={<Icon type={'DeleteOutlined'} />}
              onClick={() => setFieldValue('listingMedia.video', videos.splice(index, 1) && videos)}
              style={{ marginBottom: '30px' }}
            />
          </Col>
        </Row>
      </FormItem>
    ));
  }

  const addVideo = () => {
    const obj = {
      url: '',
      type: VIDEO
    };
    setFieldValue('listingMedia.video', [...props.values.listingMedia.video, obj]);
  };

  return (
    <Row gutter={24}>
      <Col md={12} sm={24} xs={24} lg={12} align="left">
        <Row>
          <Col span={18}>
            <FormItem
              label={
                <Space align="center">
                  <Icon type="VideoCameraOutlined" />
                  {t('listingForm.addVideo')}
                </Space>
              }
            ></FormItem>
          </Col>
          <Col span={6} align="right">
            <FormItem>
              <AddButton color="primary" onClick={addVideo}>
                {t('listingForm.btn.add')}
              </AddButton>
            </FormItem>
          </Col>
        </Row>
        <Col span={24}>{formItemsVideos}</Col>
      </Col>
      <Col md={12} sm={24} xs={24} lg={12} align="left">
        <FieldArray
          name="listingMedia.image"
          render={arrayHelpers => (
            <RenderUploadMultipleWithCrop
              label={t('listingForm.image')}
              setload={l => setLoad(l)}
              height={IMG_ASPECT.medium.height}
              width={IMG_ASPECT.medium.width}
              arrayHelpers={arrayHelpers}
              values={values.listingMedia.image}
              getType={true}
              dictKey="url"
              extraFields={[{ type: 'image' }]}
            />
          )}
        />
      </Col>
      <Col span={24} align="right">
        <Row>
          <Col span={12} align="left">
            <br />
            <Button onClick={() => setStep(1)}>
              <Icon type="ArrowLeftOutlined" />
              {t('listingForm.btn.previous')}
            </Button>
          </Col>

          <Col span={12} align="right">
            <br />
            <SubmitButton style={{ width: 'auto' }} disable={!load} type="submit">
              {t('listingForm.btn.submit')}
            </SubmitButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MediasFormFields;
