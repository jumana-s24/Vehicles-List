export default function Spinner() {
  return (
    <div
      data-testid="spinner"
      className="min-h-screen flex justify-center items-center"
      aria-label="Loading"
      role="status"
    >
      <div
        className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"
        aria-hidden="true"
      ></div>
    </div>
  );
}
