import React from "react";

import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
import QuestionAdminView from "../components/QuestionAdminView";

class Question extends React.Component {
  render() {
    return <QuestionAdminView {...this.props} />;
  }
}

export default translate("question")(Question);
