import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-2xl mt-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className="text-xl mt-6 text-blue-600 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
