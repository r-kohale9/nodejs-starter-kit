import update from 'immutability-helper';
import { History } from 'history';

import { Message } from '@gqlapp/look-client-react';
import { HOME_ROUTES } from '@gqlapp/home-client-react';

import CATEGORIES_SUBSCRIPTION from '../graphql/CategoriesSubscription.graphql';
import CATEGORY_SUBSCRIPTION from '../graphql/CategorySubscription.graphql';
import ROUTES from '../routes';

// types
import { FilterCategoryInput } from '../../../../packages/server/__generated__/globalTypes';
import { categories_categories as Categories } from '../graphql/__generated__/categories';
import {
  category_category as Category,
  category_category_edges as CategoryEdges
} from '../graphql/__generated__/category';

export const subscribeToCategories = (subscribeToMore, filter: FilterCategoryInput) =>
  subscribeToMore({
    document: CATEGORIES_SUBSCRIPTION,
    variables: { filter },
    updateQuery: (
      prev: { categories: Categories },
      {
        subscriptionData: {
          data: {
            categoriesUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { categoriesUpdated: { mutation: string; node: Category } } } }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddCategories(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditCategories(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteCategories(prev, node);
      }
      return newResult;
    }
  });

function onAddCategories(prev: { categories: Categories }, node: Category) {
  if (prev.categories.edges.some(category => node.id === category.cursor)) {
    return update(prev, {
      categories: {
        totalCount: {
          $set: prev.categories.totalCount - 1
        },
        edges: {
          $set: prev.categories.edges
        }
      }
    });
  }

  const filteredcategories = prev.categories.edges.filter(category => category.node.id !== null);

  const edge: CategoryEdges = {
    cursor: node.id,
    node,
    __typename: 'CategoryEdges'
  };

  return update(prev, {
    categories: {
      totalCount: {
        $set: prev.categories.totalCount + 1
      },
      edges: {
        $set: [edge, ...filteredcategories]
      }
    }
  });
}

function onEditCategories(prev: { categories: Categories }, node: Category) {
  // console.log(node, 'node');
  const index = prev.categories.edges.findIndex(x => x.node.id === node.id);
  const edge: CategoryEdges = {
    cursor: prev.categories.edges.length - node.id,
    node,
    __typename: 'CategoryEdges'
  };
  if (index) {
    prev.categories.edges.splice(index, 1, edge);
    return update(prev, {
      categories: {
        edges: {
          $set: [...prev.categories.edges]
        }
      }
    });
  }
}

const onDeleteCategories = (prev: { categories: Categories }, node: Category) => {
  if (node.parentCategoryId !== null) {
    const parentCategory = prev.categories.edges.filter(x => x.node.id === node.parentCategoryId);
    const idx = prev.categories.edges.findIndex(x => x.node.id === node.parentCategoryId);

    const subCategories = parentCategory[0].node.subCategories.filter(x => x.id !== node.id);
    parentCategory[0].node.subCategories = subCategories;

    prev.categories.edges.splice(idx, 1, parentCategory[0]);
    return update(prev, {
      categories: {
        edges: {
          $set: [...prev.categories.edges]
        }
      }
    });
  }

  // ignore if not found
  const index = prev.categories.edges.findIndex(x => x.node.id === node.id);
  if (index < 0) {
    return prev;
  } else {
    return update(prev, {
      categories: {
        totalCount: {
          $set: prev.categories.totalCount - 1
        },
        edges: {
          $splice: [[index, 1]]
        }
      }
    });
  }
};
export const subscribeToCategory = (subscribeToMore, CategoryId: number, history: History) =>
  subscribeToMore({
    document: CATEGORY_SUBSCRIPTION,
    variables: { id: CategoryId },
    updateQuery: (
      prev: { category: Category },
      {
        subscriptionData: {
          data: {
            categoryUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { categoryUpdated: { mutation: string; node: Category } } } }
    ) => {
      let newResult = prev;
      // console.log('mutation', mutation, node);
      if (mutation === 'UPDATED') {
        newResult = onEditCategory(prev, node);
      } else if (mutation === 'DELETED') {
        onDeleteCategory(history);
      }
      return newResult;
    }
  });

function onEditCategory(prev: { category: Category }, node: Category) {
  return update(prev, {
    category: {
      $set: node
    }
  });
}

const onDeleteCategory = (history: History) => {
  Message.info('This Category has been deleted!');
  if (history) {
    Message.warn('Redirecting to Categories');
    return history.push(`${ROUTES.adminPanel}`);
  } else {
    return history.push(`${HOME_ROUTES.home}`);
  }
};
