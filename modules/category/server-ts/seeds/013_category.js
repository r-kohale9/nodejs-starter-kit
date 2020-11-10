/* eslint-disable import/prefer-default-export */
import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { camelizeKeys, decamelizeKeys } from 'humps';

const CATEGORY = {
  title: `Category 1`,
  description: `Category description 1`,
  imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C1`,

  subCategory: [
    {
      title: `Category 1.1`,
      description: `Category description 1.1`,
      imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C1.1`,

      subCategory: [
        {
          title: `Category 1.1.1`,
          description: `Category description 1.1.1`,
          imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C1.1.1`,

          subCategory: [
            {
              title: `Category 1.1.1.1`,
              description: `Category description 1.1.1.1`,
              imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C1.1.1.1`
            },
            {
              title: `Category 1.1.1.2`,
              description: `Category description 1.1.1.2`,
              imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C1.1.1.1`
            }
          ]
        },
        {
          title: `Category 1.1.2`,
          description: `Category description 1.1.2`,
          imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C1.1.1`,

          subCategory: [
            {
              title: `Category 1.1.1.1`,
              description: `Category description 1.1.1.1`,
              imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C1.1.1.1`
            }
          ]
        }
      ]
    }
  ]
};

export async function seed(knex) {
  await truncateTables(knex, Promise, ['category', 'modal_category']);
  async function add(obj) {
    return await returnId(knex('category')).insert(decamelizeKeys(obj));
  }

  async function addCategory(parentCategory) {
    try {
      const { title, description, imageUrl, subCategory, parentCategoryId } = parentCategory;
      const parentId = camelizeKeys(await add({ title, description, imageUrl, parentCategoryId }))[0];
      subCategory &&
        subCategory.map(async c => {
          await addCategory({
            title: c.title,
            description: c.description,
            imageUrl: c.imageUrl,
            subCategory: c.subCategory,
            parentCategoryId: parentId
          });
        });
      return true;
    } catch (e) {
      throw Error(e);
    }
  }

  await Promise.all(
    [...Array(1).keys()].map(async () => {
      addCategory(CATEGORY);
    })
  );
}