import React from 'react';
import { withPlatform } from './SettingOperations';

import { platform_platform as Platform } from '../graphql/__generated__/platform';

const hasType = (type: string | string[], platform: Platform) => {
  return platform && (!type || (Array.isArray(type) ? type : [type]).indexOf(platform.type) >= 0) ? true : false;
};

export interface PlatformTypeComponentProps {
  loading: boolean;
  platform: Platform;
  type: string | string[];
  children: JSX.Element;
  elseComponent?: JSX.Element;
}

const PlatformTypeComponent: React.FC<PlatformTypeComponentProps> = ({
  loading,
  platform,
  type,
  children,
  elseComponent,
  ...restProps
}) =>
  loading
    ? null
    : hasType(type, platform)
    ? React.cloneElement(children, {
        ...restProps
      })
    : elseComponent || null;

export const PlatformType = withPlatform(PlatformTypeComponent);
