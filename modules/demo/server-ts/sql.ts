import { knex } from '@gqlapp/database-server-ts';

export default class Demo {
  public demos() {
    return knex.select();
  }
}
