'use client';

import { FunctionComponent } from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { randomNumber } from '@/lib/utilities';
import { useUiShallow } from '@/states/uiState';

type Props = Omit<IContentLoaderProps, 'width' | 'height'> & {
  width?: `${string}%` | `${string}em` | `${string}rem` | `calc(${string})` | number | number[];
  height?: `${string}%` | `${string}em` | `${string}rem` | `calc(${string})` | number | number[];
  rounded?: number;
};

const BoxLoading: FunctionComponent<Props> = ({
  width: boxWidth = 20,
  height: boxHeight = 20,
  rounded = 3,
  ...props
}) => {
  // Hooks
  const theme = useUiShallow((state) => state.theme);

  // Vars
  const width = 'number' === typeof boxWidth ? boxWidth : (
    'string' === typeof boxWidth ? boxWidth : randomNumber(boxWidth[0], boxWidth[1])
  );
  const height = 'number' === typeof boxHeight ? boxHeight : (
    'string' === typeof boxHeight ? boxHeight : randomNumber(boxHeight[0], boxHeight[1])
  );

  const viewWidth = width;
  const viewHeight = height;

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={viewHeight}
      viewBox={('string' === typeof viewWidth || 'number' === typeof viewWidth)
        ? undefined
        : `0 0 ${viewWidth} ${viewHeight}`}
      backgroundColor={theme === 'light' ? '#dadada' : '#bdbdbd'}
      foregroundColor={theme === 'light' ? '#bdbdbd' : '#dadada'}
      {...props}
    >
      {/* Row 1 */}
      <rect x="0" y="1" rx={rounded} ry={rounded} width={width} height={height} />
    </ContentLoader>
  );
};

export default BoxLoading;
