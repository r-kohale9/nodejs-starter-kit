import React from "react";
import Grid from "hedron";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import { translate } from "@gqlapp/i18n-client-react";
import { LayoutCenter, PageLayout, Card } from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";

import QuestionForm from "./QuestionForm";

const QuestionEditView = ({ loading, question, t, onSubmit }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t("questionEdit.title")}`}
      meta={[
        {
          name: "description",
          content: `${settings.app.name} - ${t("questionEdit.meta")}`,
        },
      ]}
    />
  );

  const renderContent = () => (
    <Card>
      <h2>Question Edit</h2>
      <QuestionForm onSubmit={onSubmit} initialValues={question} />
    </Card>
  );

  return (
    <PageLayout>
      {renderMetaData()}
      {renderContent()}
    </PageLayout>
  );
};

QuestionEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  question: PropTypes.object,
  currentQuestion: PropTypes.object,
  t: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default translate("question")(QuestionEditView);
