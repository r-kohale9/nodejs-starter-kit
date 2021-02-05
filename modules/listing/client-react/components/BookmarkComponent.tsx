import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { compose } from '@gqlapp/core-common';
import { Icon, Button } from '@gqlapp/look-client-react';

import { withListingBookmarkStatus } from '../containers/ListingOperations';

const BookmarkStyle = styled.div<{ right: string }>`
  @media screen and (min-width: 769px) {
    position: absolute;
  }
  right: ${props => (props.right ? props.right : '6%')};
  top: 3%;
  z-index: 1;
`;

export interface BookmarkComponentProps {
  handleBookmark: () => void;
  listingBookmarkStatus: boolean;
  right: string;
}

const BookmarkComponent: React.FC<BookmarkComponentProps> = props => {
  const { handleBookmark, listingBookmarkStatus, right } = props;
  const [status, setStatus] = useState(listingBookmarkStatus);

  useEffect(() => {
    setStatus(listingBookmarkStatus);
  }, [listingBookmarkStatus]);

  // console.log('props', props, 'status', status);
  const handleClick = () => {
    try {
      handleBookmark();
      setStatus(!status);
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    <BookmarkStyle right={right}>
      <Button shape="circle" color={'primary'} ghost onClick={handleClick}>
        {status && status ? (
          <Icon type="StarFilled" style={{ fontSize: '15px' }} />
        ) : (
          <Icon type="StarOutlined" style={{ fontSize: '15px' }} />
        )}
      </Button>
    </BookmarkStyle>
  );
};

export default compose(withListingBookmarkStatus)(BookmarkComponent);
