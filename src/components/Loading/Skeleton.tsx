interface LoadingSkeleton {
  className?: string;
  height?: string;
  width?: string;
}

const LoadingSkeleton = (props: LoadingSkeleton) => {
  const { className, height, width } = props;

  const style: React.CSSProperties = {};
  if (height) {
    style.height = height;
  }
  if (width) {
    style.width = width;
  }

  return <div className={`${className} loading-skeleton`} {...{ style }}></div>;
};

export default LoadingSkeleton;
