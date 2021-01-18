import React from "react";
import Helmet from "react-helmet";

import { PageLayout } from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";

const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${t("title")}`}
    meta={[
      { name: "description", content: `${settings.app.name} - ${t("meta")}` },
    ]}
  />
);

const QuestionView = ({ t, ...props }) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      <div className="text-center">
        <p>{t("welcomeText")}</p>
      </div>
    </PageLayout>
  );
};

export default QuestionView;
