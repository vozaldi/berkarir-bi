'use client';

import { FunctionComponent, useEffect, useId, useState } from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { randomNumber } from '@/lib/utilities';
import { useUiShallow } from '@/states/uiState';

type Props = Omit<IContentLoaderProps, 'width' | 'height'> & {
  width?: `${string}%` | `${string}em` | `${string}rem` | `calc(${string})` | number | number[] | Array<`${string}%`>;
  height?: `${string}%` | `${string}em` | `${string}rem` | `calc(${string})` | number | number[];
  rounded?: number;

  /**
   * Automatically set height to 1.25em.
   * Ignored when `height` is present
   */
  asText?: boolean;
};

const BoxLoading: FunctionComponent<Props> = ({
  width: boxWidth,
  height: boxHeight,
  rounded = 4,
  asText,
  ...props
}) => {
  // Hooks
  const theme = useUiShallow((state) => state.theme);

  const id = useId();

  const initialWidth = 'number' === typeof boxWidth ? boxWidth : (
    'string' === typeof boxWidth ? boxWidth : (
      Array.isArray(boxWidth) ? (boxWidth[1] || boxWidth[0]) : 100
    )
  );
  const initialHeight = 'number' === typeof boxHeight ? boxHeight : (
    'string' === typeof boxHeight ? boxHeight : (
      Array.isArray(boxHeight) ? (boxHeight[1] || boxHeight[0]) : undefined
    )
  );

  // States
  const [{ width, height }, setDetail] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  // Effects
  useEffect(() => {
    const isWidthArray = Array.isArray(boxWidth);
    const isHeightArray = Array.isArray(boxHeight);

    if (isWidthArray || isHeightArray) {
      setDetail(state => ({
        ...state,
        width: isWidthArray ? randomNumber(boxWidth[0], boxWidth[1]) : state.width,
        height: isHeightArray ? randomNumber(boxHeight[0], boxHeight[1]) : state.height,
      }));
    }
  }, []);

  // Vars
  const fallbackHeight = (!height && asText) ? '1.25em' : (height || 20);
  const viewWidth = width;
  const viewHeight = fallbackHeight;

  return (
    <ContentLoader
      uniqueKey={id}
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
      <rect x="0" y="1" rx={rounded} ry={rounded} width={width} height={fallbackHeight} />
    </ContentLoader>
  );
};

export default BoxLoading;
