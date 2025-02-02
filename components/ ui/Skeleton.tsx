export default function Skeleton({
  width,
  height,
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      data-testid="skeleton"
      aria-hidden="true"
      role="presentation"
      className={`bg-gray-300 animate-pulse rounded-md ${className}`}
      style={{ width, height }}
    ></div>
  );
}
