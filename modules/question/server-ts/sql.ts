import {
  camelizeKeys,
  decamelizeKeys,
  //  decamelize
} from "humps";
import { knex } from "@gqlapp/database-server-ts";

import { Model } from "objection";
import { has } from "lodash";

const eager = "[choices]";

export default class Question extends Model {
  static get tableName() {
    return "question";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      choices: {
        relation: Model.HasManyRelation,
        modelClass: Choice,
        join: {
          from: "question.id",
          to: "choice.question_id",
        },
      },
    };
  }

  public async getQuestionList(
    filter: any,
    limit: number,
    after: number,
    orderBy: any
  ) {
    const queryBuilder = Question.query()
      .withGraphFetched(eager)
      .orderBy("id", "desc");
    console.log("questionSQL1", camelizeKeys(await queryBuilder));
    // if (userId) {
    //   const userGroups = await knex
    //     .select("group.id as id", "group.title as title")
    //     .from("group")
    //     .leftJoin("group_member", "group.id", "group_member.group_id")
    //     .leftJoin("user", "group_member.email", "user.email")
    //     .where("user.id", userId);
    //   // .orderBy("id", "desc");

    //   const userGroupsIdArr =
    //     userGroups &&
    //     userGroups.map((uG) => {
    //       return uG.id;
    //     });
    //   console.log("userGeroupssdfsda", userGroups, userGroupsIdArr);
    //   queryBuilder.whereIn("group.id", userGroupsIdArr);
    // }

    if (filter) {
      if (has(filter, "isActive") && filter.isActive !== false) {
        queryBuilder.where(function() {
          this.where("question.is_active", filter.isActive);
        });
      }
      if (has(filter, "searchText") && filter.searchText !== "") {
        queryBuilder.where(function() {
          this.where(
            knex.raw("LOWER(??) LIKE LOWER(?)", [
              "choice.description",
              `%${filter.searchText}%`,
            ])
          ).orWhere(
            knex.raw("LOWER(??) LIKE LOWER(?)", [
              "question.description",
              `%${filter.searchText}%`,
            ])
          );
        });
      }
    }

    queryBuilder
      .from("question")
      .leftJoin("choice", "question.id", "choice.question_id")
      .groupBy("question.id")
      .orderBy("id", "desc");

    const allQustions = camelizeKeys(await queryBuilder);
    const total = allQustions.length;

    let questions = {};
    if (limit && after) {
      questions = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    } else if (limit && !after) {
      questions = camelizeKeys(await queryBuilder.limit(limit));
    } else if (!limit && after) {
      questions = camelizeKeys(await queryBuilder.offset(after));
    } else {
      questions = camelizeKeys(await queryBuilder);
    }
    console.log("questionsSQL", allQustions);
    return { questions, total };
  }

  public async getQuestion(id: number) {
    const res = camelizeKeys(
      await Question.query()
        .findById(id)
        .withGraphFetched(eager)
    );
    console.log("getQuestionSQL", res);
    return res;
  }

  public async addQuestion(input: any) {
    const res = camelizeKeys(
      await Question.query().insertGraph(decamelizeKeys(input))
    );
    return res.id;
  }

  public async updateQuestion(input: any) {
    console.log('sqlquestioneditinputtttttttttttt', input);
    const res = camelizeKeys(
      await Question.query().upsertGraph(decamelizeKeys(input))
    );
    return res;
  }

  public async getQuestionItem(id: number) {
    const res = camelizeKeys(
      await Question.query()
        .findById(id)
        .first()
    );
    return res;
  }

  public async deleteQuestion(id: number) {
    return knex("question")
      .where("id", "=", id)
      .del();
  }

  // public async duplicateQuestion(userId: number, quizId: number) {
  //   var insertData = await Quiz.query()
  //     .eager(eager)
  //     .where("id", "=", quizId)
  //     .first();

  //   function deleteIds(v) {
  //     delete v.id;
  //     delete v.created_at;
  //     delete v.updated_at;
  //   }
  //   // console.log()
  //   // const res = {}
  //   deleteIds(insertData);
  //   delete insertData.user;

  //   insertData &&
  //     insertData.sections &&
  //     insertData.sections.map((sec, secI) => {
  //       deleteIds(insertData.sections[secI]);
  //       sec.questions.forEach((ques, queI) => {
  //         deleteIds(insertData.sections[secI].questions[queI]);
  //         ques.choices.forEach((cho, choI) => {
  //           deleteIds(insertData.sections[secI].questions[queI].choices[choI]);
  //         });
  //       });
  //     });
  //   insertData.user_id = userId;
  //   const res = camelizeKeys(
  //     await Quiz.query()
  //       // .eager(eager)
  //       .insertGraphAndFetch(insertData)
  //       .first()
  //   );
  //   return res;
  // }
}

export class Choice extends Model {
  static get tableName() {
    return "choice";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: "choice.question_id",
          to: "question.id",
        },
      },
    };
  }
}
