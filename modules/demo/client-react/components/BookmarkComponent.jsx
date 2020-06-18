import React, { useEffect, useState } from 'react';
import { compose } from '@gqlapp/core-common';
import styled from 'styled-components';
import { Button } from 'antd';
import { withListingBookmarkStatus } from '@gqlapp/listing-client-react/containers/ListingOperations';
import Heart from '../Icons/heart.svg';
import HeartActive from '../Icons/heartactive.svg';

const RectangleActive = styled(Button)`
  /* Rectangle 85 */

  /* position: absolute; */
  width: 30px;
  height: 30px;
  /* left: 93px;
  top: 115px; */

  z-index: 1;

  background: #f5f5f5;
  border: 1px solid #fc4c4c;
  box-sizing: border-box;
  border-radius: 9px;
`;

const Rectangle = styled(Button)`
  /* Rectangle 85 */

  /* position: absolute; */
  width: 30px;
  height: 30px;
  /* left: 93px;
  top: 115px; */

  z-index: 1;

  background: #f5f5f5;
  border: 1px solid rgba(35, 30, 54, 0.7);
  box-sizing: border-box;
  border-radius: 9px;
`;

const BookmarkComponent = props => {
  const { handleBookmark, listingBookmarkStatus } = props;
  const [status, setStatus] = useState(listingBookmarkStatus);

  useEffect(() => {
    setStatus(listingBookmarkStatus);
  }, [listingBookmarkStatus]);

  const handleEvent = () => {
    handleBookmark();
    setStatus(!status);
  };

  return status && status ? (
    <RectangleActive onClick={handleEvent}>
      <img
        alt=""
        src={HeartActive}
        style={{
          position: 'absolute',
          left: '7px',
          top: '7px',
          height: '15px',
          width: '15px'
        }}
      />
    </RectangleActive>
  ) : (
    <Rectangle onClick={handleEvent}>
      <img
        alt=""
        src={Heart}
        style={{
          position: 'absolute',
          left: '7px',
          top: '7px',
          height: '15px',
          width: '15px'
        }}
      />
    </Rectangle>
  );
};

export default compose(withListingBookmarkStatus)(BookmarkComponent);
