import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { QuestionTypes } from '@gqlapp/question-common';

// const questionTypes = [QuestionTypes.MSELECT, QuestionTypes.RADIO, QuestionTypes.TEXTAREA, QuestionTypes.TEXTBOX, QuestionTypes.SELECT];

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, ['question', 'choice']);
  await Promise.all(
    [...Array(6).keys()].map(async subj => {
      const subjectId = await returnId(knex('subject')).insert({
        //   quiz_id:quizId,
        title: `Subject ${subj + 1}`,
        description: `This is subject ${subj + 1}`,
        is_active: true
      });
      await Promise.all(
        [...Array(8).keys()].map(async chap => {
          const chapterId = await returnId(knex('chapter')).insert({
            //   quiz_id:quizId,
            subject_id: subjectId[0],
            title: `Chapter ${chap + 1}`,
            description: `This is chapter ${chap + 1}`,
            is_active: true
          });
          await Promise.all(
            [...Array(4).keys()].map(async top => {
              const topicId = await returnId(knex('topic')).insert({
                //   quiz_id:quizId,
                chapter_id: chapterId[0],
                title: `Topic ${top + 1}`,
                description: `This is topic ${top + 1}`,
                is_active: true
              });
              await Promise.all(
                [...Array(25).keys()].map(async i => {
                  const questionId = await returnId(knex('question')).insert({
                    topic_id: topicId[0],
                    //   quiz_id:quizId,
                    is_active: true,
                    description: `<p> (${i}) Let &zeta;N,e 3 t. A right-Newton, locally Poncelet, pseudo-real isomorphism equipped with a sub-tangential, Peano, &rho;-extrinsic vector is a homomorphism if it is Liouville.</p> `,
                    question_type: QuestionTypes.RADIO
                  });
                  await Promise.all(
                    [...Array(4).keys()].map(async ii => {
                      const choiceId = await returnId(knex('choice')).insert({
                        question_id: questionId[0],
                        description: `<p> (${i * 10 +
                          ii}) Let F 6= &alefsym;0. Assume |&Gamma;| &ge; 0. Then G &gt;&circ; a&tilde;.</p>`
                      });
                    })
                  );
                })
              );
            })
          );
        })
      );
    })
  );
}
