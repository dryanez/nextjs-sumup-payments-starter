import Link from 'next/link';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you requested could not be found.</p>
        <Link href="/registration" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
          Go to Registration
        </Link>
      </div>
    </>
  );
}
