import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Spin as Loader, Tooltip, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { translate } from "@gqlapp/i18n-client-react";
import {
  Table,
  Button,
  // CatalogueWithInfiniteScroll,
  // RenderTableLoading,
  PageLayout,
} from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";
import Helmet from "react-helmet";
import CatalogueWithInfiniteScroll from "@gqlapp/look-client-react/ui-antd/components/CatalogueWithInfiniteScroll";
import RenderTableLoading from "@gqlapp/look-client-react/ui-antd/components/RenderTableLoading";

const cancel = () => {
  message.error("Task cancelled");
};

const QuestionAdminView = ({
  loading,
  questionList,
  t,
  deleteQuestion,
  duplicateQuestion,
  currentUser,
  loadDataQuestionList,
}) => {
  //

  // const renderOrderByArrow = name => {
  //   if (orderBy && orderBy.column === name) {
  //     if (orderBy.order === 'desc') {
  //       return <span className="badge badge-primary">&#8595;</span>;
  //     } else {
  //       return <span className="badge badge-primary">&#8593;</span>;
  //     }
  //   } else {
  //     return <span className="badge badge-secondary">&#8645;</span>;
  //   }
  // };

  // const handleOrderBy = (e, name) => {
  //   e.preventDefault();

  //   let order = 'asc';
  //   if (orderBy && orderBy.column === name) {
  //     if (orderBy.order === 'asc') {
  //       order = 'desc';
  //     } else if (orderBy.order === 'desc') {
  //       return onOrderBy({
  //         column: '',
  //         order: ''
  //       });
  //     }
  //   }

  //   return onOrderBy({ column: name, order });
  // };

  const columns = [
    {
      title: (
        <>
          <h5>Id</h5>
          {/* <a onClick={e => handleOrderBy(e, 'username')} href="#">
          {t('users.column.name')} {renderOrderByArrow('username')}
        </a> */}
        </>
      ),
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <>
          {console.log("IdsIds", record.node.id)}
          {record.node.id}
          {/* <Link className="user-link" to={`/users/${record.id}`}>
          {text}
        </Link> */}
        </>
      ),
    },
    {
      title: <>Description</>,
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <div
          dangerouslySetInnerHTML={{
            __html: record.node.description || "<div></div>",
          }}
        ></div>
      ),
    },
    // {
    //   title: (
    //     <>
    //       <h5>User</h5>
    //       {/* <a onClick={e => handleOrderBy(e, 'isActive')} href="#">
    //       {t('users.column.active')} {renderOrderByArrow('isActive')}
    //     </a> */}
    //     </>
    //   ),
    //   dataIndex: "record.user.username",
    //   key: "username",
    //   render: (text, record) => (
    //     <h5>{record.node.user && record.node.user.username}</h5>
    //   ),
    // },
    // // {
    // //   title: (
    // //     <a onClick={e => handleOrderBy(e, 'role')} href="#">
    // //       {t('users.column.role')} {renderOrderByArrow('role')}
    // //     </a>
    // //   ),
    // //   dataIndex: 'role',
    // //   key: 'role'
    // // },
    // {
    //   title: "View Answer Count",
    //   key: "count",
    //   render: (text, record) => (
    //     <Button
    //       color="primary"
    //       size="sm"
    //       href={`/question/count/${record.node.id}`}
    //     >
    //       View Answer Count
    //     </Button>
    //   ),
    // },
    // {
    //   title: "View Userwise Result",
    //   key: "userWiseResult",
    //   render: (text, record) => (
    //     <Button
    //       color="primary"
    //       size="sm"
    //       href={`/question/report/${record.node.id}`}
    //     >
    //       View Report
    //     </Button>
    //   ),
    // },
    // {
    //   title: "View Attendees",
    //   key: "attendees",
    //   render: (text, record) => (
    //     <Button
    //       color="primary"
    //       size="sm"
    //       href={`/question/attendees/${record.node.id}`}
    //     >
    //       View Attendees
    //     </Button>
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Tooltip title="Edit">
            <Link to={`/question/edit/${record.node.id}`}>
              <Button
                shape="circle"
                icon="edit"
                type="secondary"
                size="medium"
                style={{ marginBottom: "10px", marginRight: "3px" }}
              />
            </Link>
          </Tooltip>
          {/* <Tooltip title="Duplicate Question">
            <Popconfirm
              title="Duplicate Question?"
              onConfirm={() =>
                duplicateQuestion({
                  questionId: record.node.id,
                  userId: currentUser && currentUser.id,
                })
              }
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" icon="copy" shape="circle" size="md" />
            </Popconfirm>
          </Tooltip> */}

          <Popconfirm
            title="Delete Question?"
            onConfirm={() => deleteQuestion(record.node.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon="delete" shape="circle" size="md" />
          </Popconfirm>
        </>
      ),
    },
  ];

  const RenderQuestionComponent = () => {
    return (
      <Fragment>
        <Table dataSource={questionList.edges} columns={columns} />
      </Fragment>
    );
  };

  return (
    <PageLayout>
      <div style={{ overflowX: "scroll", overflowY: "hidden" }}>
        {loading && <RenderTableLoading rows={6} columns={5} />}
        {/* Render main questions content */}
        {questionList && !loading && (
          <CatalogueWithInfiniteScroll
            grid={{
              gutter: 24,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            TableComponent={RenderQuestionComponent}
            endMessage={"End Of Questions"}
            loadData={loadDataQuestionList}
            list={questionList}
            loading={loading}
            hasMore={questionList.pageInfo.hasNextPage}
            endCursor={questionList.pageInfo.endCursor}
            totalCount={questionList.totalCount}
          />
        )}
      </div>
    </PageLayout>
  );
};

QuestionAdminView.propTypes = {
  // loadingQuestionAdmin: PropTypes.bool.isRequired,
  // questions: PropTypes.array,
  // // orderBy: PropTypes.object,
  // // onOrderBy: PropTypes.func.isRequired,
  // // deleteUser: PropTypes.func.isRequired,
  // t: PropTypes.func,
};

export default translate("question")(QuestionAdminView);
