import { Skeleton } from 'antd';
import _get from 'lodash/get';

type SkeletonSizeType = 'small' | 'large' | 'default' | number;

type CustomSkeletonType = {
  type?: string;
  size?: SkeletonSizeType;
  width?: number;
  height?: number;
  loading?: boolean;
  children?: JSX.Element;
  shape?: 'circle' | 'square';
  /**
   * @property {number} sizeNumber
   *
   * @description This property is no use.
   * Just for fixing TypeScript error ('sizeNumber' does not exist) in src/stories/Skeleton.stories.tsx.
   */
  sizeNumber?: number;
};

const CustomSkeleton = ({
  type,
  size,
  width,
  height,
  loading = false,
  children = <></>,
  shape,
}: CustomSkeletonType) => {
  const skeletonType = type || 'Input';
  let skeletonSize: SkeletonSizeType = size || 'small';
  let skeletonWIdth = width || 0;

  if (!size) {
    if (skeletonType === 'Avatar') {
      skeletonSize = 80;
    } else {
      skeletonSize = 'small';
    }
  }

  if (!width) {
    if (skeletonType === 'Input') {
      skeletonWIdth = 200;
    }
  }

  const Component = _get(Skeleton, skeletonType);
  const props = {
    active: true,
    skeletonSize,
    style: {},
    shape,
  };

  if (skeletonWIdth) {
    props.style = { ...props.style, skeletonWIdth };
  }

  if (height) {
    props.style = { ...props.style, height };
  }

  return loading ? <Component {...props} /> : children;
};

export default CustomSkeleton;
