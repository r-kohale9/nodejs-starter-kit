import React, {useState} from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Card, Spin, Divider, Radio } from "antd";
import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout } from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";

import QuestionForm from "./QuestionForm";

const radioStyle = {
  display: "block",
  height: "60px",
  lineHeight: "60px",
};

const QuestionEditView = ({ loading, question, t, questionLoading }) => {
  const [check, setCheck] = useState(null)
  console.log("detailview", question);
  return (
    <PageLayout>
      {questionLoading ? (
        <div align="center">
          <Spin />
        </div>
      ) : (
        <Card>
          <h1>
            <div
              dangerouslySetInnerHTML={{
                __html: (question && question.description) || "<div></div>",
              }}
            ></div>
          </h1>
          <Divider />
          <Radio.Group onChange={(e) => setCheck(e && e.target && e.target.value)} value={check}>
            {question &&
              question.choices &&
              question.choices.map((ch) => (
                <Radio style={radioStyle} key={ch.id} value={ch.id}>
                  <h2>
                    <div
                      style={{  paddingLeft:'40px', marginTop:'-60px' }}
                      dangerouslySetInnerHTML={{
                        __html: (ch && ch.description) || "<div></div>",
                      }}
                    ></div>
                  </h2>
                </Radio>
              ))}
          </Radio.Group>
        </Card>
      )}
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
