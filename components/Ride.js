import PropTypes from 'prop-types';
import Head from 'next/head';
import { useQuery } from '@apollo/client';

import Error from './util/Error';
import Loading from './util/Loading';
import { GET_RIDE } from '../queries/GET_RIDE';

const Park = ({ id }) => {
  const { loading, error, data } = useQuery(GET_RIDE, { variables: { id } });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const { ride } = data;

  if (!ride) {
    return <p>No Ride Found</p>;
  }

  return (
    <>
      <Head>
        <title>{ride.name} - DisneyMetaData | Est. 2020</title>
      </Head>
      <h1 className="text-4xl tracking-tight leading-10 font-bold text-gray-900">
        {ride.name}
      </h1>
      <p className="text-base text-gray-500">
        {ride.park.name} - {ride.park.resort.name}
      </p>
      {ride.waitTimes && ride.waitTimes[0] && (
        <h2 className="text-lg tracking-tighter leading-10 font-bold text-gray-500">
          Status:
          {ride.waitTimes[0].status === 'Closed' && (
            <span className="ml-2 text-red-500">
              {ride.waitTimes[0].status}
            </span>
          )}
          {ride.waitTimes[0].status === 'Operating' && (
            <span className="ml-2 text-green-500">
              {ride.waitTimes[0].status}
            </span>
          )}
          {ride.waitTimes[0].status !== 'Closed' &&
            ride.waitTimes[0].status !== 'Operating' && (
              <span className="ml-2 text-gray-900">
                {ride.waitTimes[0].status}
              </span>
            )}
        </h2>
      )}
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Wait Time</th>
          </tr>
        </thead>
        <tbody>
          {ride.waitTimes &&
            ride.waitTimes.map(waitTime => (
              <tr key={waitTime.id}>
                <td className="border px-4 py-2">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  }).format(new Date(waitTime.timestamp))}
                </td>
                <td className="border px-4 py-2">{waitTime.amount} min</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

Park.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Park;
