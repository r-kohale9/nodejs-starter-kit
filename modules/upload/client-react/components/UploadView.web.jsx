import React from 'react';
import Grid from 'hedron';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Dropzone from 'react-dropzone';
import filesize from 'filesize';

import { PageLayout, Table, Button, Alert } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

const UploadView = ({ files, error, loading, handleUploadFiles, handleRemoveFile, t }) => {
  const renderMetaData = () => {
    return (
      <Helmet
        title={`${settings.app.name} - ${t('title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('meta')}`
          }
        ]}
      />
    );
  };

  const columns = [
    {
      title: t('table.column.name'),
      dataIndex: 'name',
      key: 'name',
      render(text, record) {
        return (
          <a href={record.path} download={text}>
            {/* {console.log('record', record, 'text', text)} */}
            {text} ({filesize(record.size)})
          </a>
        );
      }
    },
    {
      title: t('table.column.actions'),
      key: 'actions',
      width: 50,
      render(text, record) {
        return (
          <Button color="primary" size="sm" onClick={() => handleRemoveFile(record.id)}>
            {t('table.btnDel')}
          </Button>
        );
      }
    }
  ];

  return (
    <PageLayout>
      {/* {renderMetaData()}
      <div className="text-center">
        <Row>
          <Col xs={4}>
            <Dropzone onDrop={handleUploadFiles}>
              <p>{t('message')}</p>
            </Dropzone>
          </Col>
          <Col xs={8}>
            {loading && <span>Loading...</span>}
            {error && <Alert color="error">{error}</Alert>}
            {files && <Table dataSource={files} columns={columns} />}
          </Col>
        </Row>
      </div> */}

      <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
        <Grid.Bounds direction="horizontal" valign="center" sm={{ direction: 'vertical' }} md={{ padding: '20px' }}>
          {renderMetaData()}
          <Grid.Box>
            <Dropzone onDrop={handleUploadFiles}>
              <p style={{ padding: '10px' }}>{t('message')}</p>
            </Dropzone>
          </Grid.Box>
          <Grid.Box md={{ fill: true }} lg={{ fill: true }}>
            {loading && <span>Loading...</span>}
            {error && <Alert color="error">{error}</Alert>}
            {files && <Table dataSource={files} columns={columns} />}
          </Grid.Box>
        </Grid.Bounds>
      </Grid.Provider>
    </PageLayout>
  );
};

UploadView.propTypes = {
  files: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  handleUploadFiles: PropTypes.func.isRequired,
  handleRemoveFile: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default UploadView;
