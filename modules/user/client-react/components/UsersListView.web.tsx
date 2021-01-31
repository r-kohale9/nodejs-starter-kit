/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { Table, DeleteIcon, EditIcon, RenderTableLoading } from '@gqlapp/look-client-react';

// types
import { ErrorObject, UsersProps } from '../containers/Users.web';
import { user_user_user as User } from '../graphql/__generated__/user';

export interface UsersViewProps extends UsersProps {
  //
}

const UsersView: React.FC<UsersViewProps> = ({ deleteUser, orderBy, onOrderBy, loading, users, t }) => {
  const [errors, setErrors] = useState<ErrorObject[]>([]);

  const handleDeleteUser = async (id: number) => {
    const result = await deleteUser(id);
    if (result && result.errors) {
      setErrors(result.errors);
    } else {
      setErrors([]);
    }
  };

  const renderOrderByArrow = (name: string) => {
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'desc') {
        return <span className="badge badge-primary">&#8595;</span>;
      } else {
        return <span className="badge badge-primary">&#8593;</span>;
      }
    } else {
      return <span className="badge badge-secondary">&#8645;</span>;
    }
  };

  const handleOrderBy = (e: React.SyntheticEvent, name: string) => {
    e.preventDefault();

    let order = 'asc';
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'asc') {
        order = 'desc';
      } else if (orderBy.order === 'desc') {
        return onOrderBy({
          column: '',
          order: ''
        });
      }
    }

    return onOrderBy({ column: name, order });
  };

  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'username')} href="#">
          {t('users.column.name')} {renderOrderByArrow('username')}
        </a>
      ),
      dataIndex: 'username',
      key: 'username',
      render: (text: string, record: User) => (
        <Link className="user-link" to={`/users/${record.id}`}>
          {text}
        </Link>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'email')} href="#">
          {t('users.column.email')} {renderOrderByArrow('email')}
        </a>
      ),
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'role')} href="#">
          {t('users.column.role')} {renderOrderByArrow('role')}
        </a>
      ),
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'isActive')} href="#">
          {t('users.column.active')} {renderOrderByArrow('isActive')}
        </a>
      ),
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text: string) => text.toString()
    },
    {
      title: t('users.column.actions'),
      key: 'actions',
      render: (text: string, record: User) => (
        <div>
          <Link to={`/users/${record.id}`}>
            <EditIcon />
          </Link>
          &nbsp;&nbsp;
          <DeleteIcon onClick={() => handleDeleteUser(record.id)} />
        </div>
      )
    }
  ];

  return (
    <>
      {loading ? (
        <RenderTableLoading columns={columns} />
      ) : (
        <>
          {errors &&
            errors.map(error => (
              <div className="alert alert-danger" role="alert" key={error.field}>
                {error.message}
              </div>
            ))}
          {/* for horizontal table responsive on smaller screens */}
          <div style={{ overflowX: 'auto' }}>
            <Table dataSource={users} columns={columns} />
          </div>
        </>
      )}
    </>
  );
};

export default translate('user')(UsersView);
