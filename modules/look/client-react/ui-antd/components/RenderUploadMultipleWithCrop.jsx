import React from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { FormItem } from '@gqlapp/look-client-react';

import Icon from './Icon';

const RenderUploadMultipleWithCrop = props => {
  const { width, height, values, label, setload, arrayHelpers, extraFields } = props;

  const cloudinary_url = 'https://api.cloudinary.com/v1_1/nodejs-starter-kit/image/upload';
  const cloudinary_data = { upload_preset: 'hycdtdxe' };

  let validateStatus = '';
  let defaultFileList = [];
  if (values) {
    defaultFileList = values.map((img, index) => ({
      uid: index,
      name: 'link',
      status: 'done',
      url: img.url,
      thumbUrl: img.url
    }));
  }
  const onChangeHandler = ({ file }) => {
    // console.log(file.response.secure_url);

    if (file.status === 'uploading') {
      setload(true);
    }
    if (file.status == 'done') {
      setload(false);
      if (file.response) {
        let url = file.response.secure_url;
        if (url) {
          //set value in form
          const dictKey = props.dictKey;
          let obj = {};
          obj[dictKey] = url;
          if (extraFields && extraFields.length > 0) {
            extraFields.map(eF => Object.assign(obj, eF));
          }
          console.log(obj);
          arrayHelpers.push(obj);
        }
      }
    } else if (file.status == 'removed') {
      //remove value in form
      const index = defaultFileList.indexOf(
        defaultFileList.filter(f => file.url == f.url && file.status == 'removed' && f)[0]
      );
      setload(false);
      arrayHelpers.remove(index);
    }
  };
  // console.log(defaultFileList);

  return (
    <FormItem label={label} validateStatus={validateStatus} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
      <ImgCrop
        width={width}
        height={height}
        /* shape={'round'} */ modalTitle={'Align image'}
        modalWidth={'fit-content'}
      >
        <Upload.Dragger
          defaultFileList={defaultFileList}
          name="file"
          listType="picture"
          onChange={onChangeHandler}
          action={cloudinary_url}
          data={cloudinary_data}
          // headers={headers}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="InboxOutlined" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single upload.</p>
        </Upload.Dragger>
      </ImgCrop>
    </FormItem>
  );
};

RenderUploadMultipleWithCrop.propTypes = {
  dictKey: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  setload: PropTypes.func,
  defaultFileList: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.string,
      url: PropTypes.string,
      thumbUrl: PropTypes.string
    })
  ),
  arrayHelpers: PropTypes.object,
  values: PropTypes.array,
  extraFields: PropTypes.array,
  height: PropTypes.number,
  width: PropTypes.number
};
export default RenderUploadMultipleWithCrop;
