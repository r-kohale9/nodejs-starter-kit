import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout, Card } from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";

import QuestionForm from "./QuestionForm";

const UserAddView = ({ t, onSubmit }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t("userEdit.title")}`}
      meta={[
        {
          name: "description",
          content: `${settings.app.name} - ${t("userEdit.meta")}`,
        },
      ]}
    />
  );

  const renderContent = () => (
    <Card className="form-card">
      <Link to="/question/admin">Back</Link>
      <h2>Add Question</h2>
      <QuestionForm onSubmit={onSubmit} initialValues={{}} />
    </Card>
  );

  return (
    <PageLayout type="forms">
      {renderMetaData()}

      {renderContent()}
    </PageLayout>
  );
};

UserAddView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default translate("user")(UserAddView);
