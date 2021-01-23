import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { knex, returnId } from '@gqlapp/database-server-ts';

import { has } from 'lodash';

const eager = '[choices]';
const subjectEager = '[chapter.[topic]]';

export interface Identifier {
  id: number;
}
export interface Subject {
  title: string;
  description: string;
  isActive: boolean;
}
export interface Chapter {
  title: string;
  description: string;
  chapter: Chapter;
  isActive: boolean;
}
export interface Topic {
  title: string;
  description: string;
  topic: Topic;
  isActive: boolean;
}

export default class Question extends Model {
  static get tableName() {
    return 'question';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      choices: {
        relation: Model.HasManyRelation,
        modelClass: Choice,
        join: {
          from: 'question.id',
          to: 'choice.question_id'
        }
      }
    };
  }

  public async getQuestionList(filter: any, limit: number, after: number, orderBy: any) {
    const queryBuilder = Question.query()
      .withGraphFetched(eager)
      .orderBy('id', 'desc');
    console.log('questionSQL1', camelizeKeys(await queryBuilder));
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
      if (has(filter, 'isActive') && filter.isActive !== false) {
        queryBuilder.where(function() {
          this.where('question.is_active', filter.isActive);
        });
      }
      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(knex.raw('LOWER(??) LIKE LOWER(?)', ['choice.description', `%${filter.searchText}%`])).orWhere(
            knex.raw('LOWER(??) LIKE LOWER(?)', ['question.description', `%${filter.searchText}%`])
          );
        });
      }
    }

    queryBuilder
      .from('question')
      .leftJoin('choice', 'question.id', 'choice.question_id')
      .groupBy('question.id')
      .orderBy('id', 'desc');

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
    console.log('questionsSQL', allQustions);
    return { questions, total };
  }

  public async getQuestion(id: number) {
    const res = camelizeKeys(
      await Question.query()
        .findById(id)
        .withGraphFetched(eager)
    );
    console.log('getQuestionSQL', res);
    return res;
  }

  public async addQuestion(input: any) {
    const res = camelizeKeys(await Question.query().insertGraph(decamelizeKeys(input)));
    return res.id;
  }

  public async updateQuestion(input: any) {
    console.log('sqlquestioneditinputtttttttttttt', input);
    const res = camelizeKeys(await Question.query().upsertGraph(decamelizeKeys(input)));
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
    return knex('question')
      .where('id', '=', id)
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
  public async subjectsPagination(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = SubjectDAO.query().eager(subjectEager);

    if (orderBy && orderBy.column) {
      const column = orderBy.column;
      let order = 'asc';
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    } else {
      queryBuilder.orderBy('id', 'desc');
    }

    if (filter) {
      if (has(filter, 'isActive') && filter.isActive !== '') {
        queryBuilder.where(function() {
          this.where('subject.is_active', filter.isActive);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
            .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`]))
            .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['user.username', `%${filter.searchText}%`]));
        });
      }
    }

    queryBuilder.from('subject').leftJoin('user', 'user.id', 'subject.user_id');

    const allSubjects = camelizeKeys(await queryBuilder);
    const total = allSubjects.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    // console.log(res);
    return {
      subjects: res,
      total
    };
  }
  public async chaptersPagination(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = ChapterDAO.query().eager('[topic]');

    if (orderBy && orderBy.column) {
      const column = orderBy.column;
      let order = 'asc';
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    } else {
      queryBuilder.orderBy('id', 'desc');
    }

    if (filter) {
      if (has(filter, 'isActive') && filter.isActive !== '') {
        queryBuilder.where(function() {
          this.where('chapter.is_active', filter.isActive);
        });
      }
      if (has(filter, 'subjectId') && filter.subjectId !== '') {
        queryBuilder.where(function() {
          this.where('chapter.subject_id', filter.subjectId);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`])).orWhere(
            raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`])
          );
        });
      }
    }

    const allChapters = camelizeKeys(await queryBuilder);
    const total = allChapters.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    // console.log(res);
    return {
      chapters: res,
      total
    };
  }
  public async topicsPagination(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = TopicDAO.query().eager(subjectEager);

    if (orderBy && orderBy.column) {
      const column = orderBy.column;
      let order = 'asc';
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    } else {
      queryBuilder.orderBy('id', 'desc');
    }

    if (filter) {
      if (has(filter, 'isActive') && filter.isActive !== '') {
        queryBuilder.where(function() {
          this.where('topic.is_active', filter.isActive);
        });
      }
      // if (has(filter, 'subjectId') && filter.subjectId !== '') {
      //   queryBuilder.where(function() {
      //     this.where('chapter.subject_id', filter.subjectId);
      //   });
      // }
      if (has(filter, 'chapterId') && filter.chapterId !== '') {
        queryBuilder.where(function() {
          this.where('topic.chapter_id', filter.chapterId);
        });
      }
      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`])).orWhere(
            raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`])
          );
        });
      }
    }

    const allTopics = camelizeKeys(await queryBuilder);
    const total = allTopics.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    // console.log(res);
    return {
      topics: res,
      total
    };
  }

  public async subject(id: number) {
    const res = camelizeKeys(
      await SubjectDAO.query()
        .findById(id)
        .eager(subjectEager)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }
  public async chapter(id: number) {
    const res = camelizeKeys(
      await ChapterDAO.query()
        .findById(id)
        .eager('[subject, topic]')
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }
  public async topic(id: number) {
    const res = camelizeKeys(
      await TopicDAO.query()
        .findById(id)
        .eager('[chapter.subject]')
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }

  public async addSubject(params: Subject) {
    const res = camelizeKeys(await returnId(SubjectDAO.query()).insertGraph(decamelizeKeys(params)));
    return res.id;
  }
  public async addChapter(params: Chapter) {
    const res = camelizeKeys(await returnId(ChapterDAO.query()).insertGraph(decamelizeKeys(params)));
    return res.id;
  }
  public async addTopic(params: Topic) {
    const res = camelizeKeys(await returnId(TopicDAO.query()).insertGraph(decamelizeKeys(params)));
    return res.id;
  }

  public async editSubject(params: Subject & Identifier) {
    const res = await SubjectDAO.query().upsertGraph(decamelizeKeys(params));
    return res.id;
  }
  public async editChapter(params: Chapter & Identifier) {
    const res = await ChapterDAO.query().upsertGraph(decamelizeKeys(params));
    return res.id;
  }
  public async editTopic(params: Topic & Identifier) {
    const res = await TopicDAO.query().upsertGraph(decamelizeKeys(params));
    return res.id;
  }

  public deleteSubject(id: number) {
    return knex('subject')
      .where('id', '=', id)
      .del();
  }
  public deleteChapter(id: number) {
    return knex('chapter')
      .where('id', '=', id)
      .del();
  }
  public deleteTopic(id: number) {
    return knex('topic')
      .where('id', '=', id)
      .del();
  }
}

export class Choice extends Model {
  static get tableName() {
    return 'choice';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'choice.question_id',
          to: 'question.id'
        }
      }
    };
  }
}
export class SubjectDAO extends Model {
  static get tableName() {
    return 'subject';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      chapter: {
        relation: Model.HasManyRelation,
        modelClass: ChapterDAO,
        join: {
          from: 'subject.id',
          to: 'chapter.subject_id'
        }
      }
    };
  }
}
export class ChapterDAO extends Model {
  static get tableName() {
    return 'chapter';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      subject: {
        relation: Model.BelongsToOneRelation,
        modelClass: SubjectDAO,
        join: {
          from: 'chapter.subject_id',
          to: 'subject.id'
        }
      },
      topic: {
        relation: Model.HasManyRelation,
        modelClass: TopicDAO,
        join: {
          from: 'chapter.id',
          to: 'topic.chapter_id'
        }
      }
    };
  }
}
export class TopicDAO extends Model {
  static get tableName() {
    return 'topic';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      chapter: {
        relation: Model.BelongsToOneRelation,
        modelClass: ChapterDAO,
        join: {
          from: 'topic.chapter_id',
          to: 'chapter.id'
        }
      }
    };
  }
}
