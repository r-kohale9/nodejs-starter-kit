import React from 'react';

export const displayDataCheck = (text: string, bool = false) => {
  if (bool) {
    return text ? 'True' : 'False';
  }
  return text ? text : 'Not-Provided';
};

export const useImageLoaded = () => {
  const [loaded, setLoaded] = React.useState(false);
  const ref = React.useRef<HTMLImageElement>();
  const onLoad = () => {
    setLoaded(true);
  };
  React.useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });
  return [ref, loaded, onLoad];
};

export const removeEmpty = (obj: object) => {
  const newObj = {};

  Object.keys(obj).forEach((key: string) => {
    if (obj[key] && typeof obj[key] === 'object') {
      newObj[key] = removeEmpty(obj[key]); // recurse
    } else if (obj[key] != null) {
      newObj[key] = obj[key]; // copy value
    }
  });

  return newObj;
};

export const priceCommaSeparator = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
