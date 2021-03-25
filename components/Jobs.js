import Head from 'next/head';
import { useQuery } from '@apollo/client';

import Error from './util/Error';
import Loading from './util/Loading';
import { JOBS } from '../queries';

const Park = () => {
  const { loading, error, data } = useQuery(JOBS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const { jobs } = data;

  if (!jobs) {
    return <p>No Jobs Found</p>;
  }

  return (
    <>
      <Head>
        <title>Jobs - DisneyMetaData | Est. 2020</title>
      </Head>

      <h1 className="text-4xl tracking-tight leading-10 font-bold text-gray-900">
        Jobs
      </h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="py-2 text-left">ID</th>
            <th className="py-2 text-left">Start Time</th>
            <th className="py-2 text-left">EndTime</th>
            <th className="py-2 text-left">Created</th>
            <th className="py-2 text-left">User</th>
          </tr>
        </thead>
        <tbody>
          {jobs &&
            jobs.map(job => (
              <tr key={job.id}>
                <td className="border px-4 py-2">
                  <a>{job.id}</a>
                </td>
                <td className="border px-4 py-2">
                  <span>{job.startTime}</span>
                </td>
                <td className="border px-4 py-2">
                  <span>{job.endTime}</span>
                </td>
                <td className="border px-4 py-2">
                  <span>{job.created}</span>
                </td>
                <td className="border px-4 py-2">
                  <span>{job.user.email}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Park;
