import { returnId, truncateTables } from "@gqlapp/database-server-ts";
import { QuestionTypes } from "@gqlapp/question-common";

// const questionTypes = [QuestionTypes.MSELECT, QuestionTypes.RADIO, QuestionTypes.TEXTAREA, QuestionTypes.TEXTBOX, QuestionTypes.SELECT];

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, ["question", "choice"]);
  await Promise.all(
    [...Array(50).keys()].map(async (i) => {
      const questionId = await returnId(knex("question")).insert({
        //   quiz_id:quizId,
        is_active: true,
        description: `<p> (${i}) Let &zeta;N,e 3 t. A right-Newton, locally Poncelet, pseudo-real isomorphism equipped with a sub-tangential, Peano, &rho;-extrinsic vector is a homomorphism if it is Liouville.</p> `,
        question_type: QuestionTypes.RADIO,
      });
      await Promise.all(
        [...Array(4).keys()].map(async (ii) => {
          const choiceId = await returnId(knex("choice")).insert({
            question_id: questionId[0],
            description: `<p> (${i * 10 +
              ii}) Let F 6= &alefsym;0. Assume |&Gamma;| &ge; 0. Then G &gt;&circ; a&tilde;.</p>`,
          });
        })
      );
    })
  );
}
