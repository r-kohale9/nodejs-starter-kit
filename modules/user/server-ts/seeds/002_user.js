import bcrypt from 'bcryptjs';
import { returnId, truncateTables } from '@gqlapp/database-server-ts';

export async function seed(knex) {
  await truncateTables(knex, Promise, [
    'user',
    'user_profile',
    'auth_certificate',
    'auth_facebook',
    'auth_github',
    'auth_linkedin'
  ]);

  const id = await returnId(knex('user')).insert({
    username: 'admin',
    email: 'admin@example.com',
    password_hash: await bcrypt.hash('admin123', 12),
    role: 'admin',
    is_active: true
  });

  // users profiles
  await returnId(
    knex('user_profile').insert({
      full_name: 'admin',
      user_id: 1,
      image_url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      date_of_birth: '12/12/1989',
      mobile: '+91 88888 9999',
      watsapp: '',
      details: ''
    })
  );
  await returnId(
    knex('auth_certificate').insert({
      serial: 'admin-123',
      user_id: id[0]
    })
  );

  await Promise.all(
    [...Array(15).keys()].map(async ii => {
      await returnId(knex('user')).insert({
        username: `${ii + 1}baker${ii + 1}`,
        email: `baker${ii + 1}@example.com`,
        password_hash: await bcrypt.hash('baker123', 12),
        role: 'baker',
        is_active: true
      });
      await returnId(
        knex('user_profile').insert({
          full_name: `${ii + 1}baker${ii + 1}`,
          user_id: ii + 2,
          mobile: '+91 88888 9999',
          image_url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          date_of_birth: '12/12/1989',
          watsapp: '+91 88888 99999',
          details:
            "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
        })
      );
    })
  );
  await Promise.all(
    [...Array(15).keys()].map(async ii => {
      await returnId(knex('user')).insert({
        username: `${ii + 1}user${ii + 1}`,
        email: `user${ii + 1}@example.com`,
        password_hash: await bcrypt.hash('user1234', 12),
        role: 'user',
        is_active: true
      });
      await returnId(
        knex('user_profile').insert({
          full_name: `${ii + 1}user${ii + 1}`,
          user_id: ii + 17,
          image_url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          date_of_birth: '12/12/1989',
          mobile: '+91 88888 9999',
          watsapp: '',
          details: ''
        })
      );
    })
  );
}
