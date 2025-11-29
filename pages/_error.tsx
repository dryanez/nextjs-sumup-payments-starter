import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>Error {statusCode || ''}</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">
          {statusCode ? `Error ${statusCode}` : 'An error occurred'}
        </h1>
        <p className="text-gray-600 mb-8">
          {statusCode === 404
            ? 'The page you requested could not be found.'
            : 'Something went wrong. Please try again.'}
        </p>
        <Link href="/registration" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
          Go to Registration
        </Link>
      </div>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
