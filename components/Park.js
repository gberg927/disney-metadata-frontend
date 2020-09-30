import PropTypes from 'prop-types';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import Link from 'next/link';

import Error from './util/Error';
import Loading from './util/Loading';
import { GET_PARK } from '../queries/GET_PARK';

const Park = ({ id }) => {
  const { loading, error, data } = useQuery(GET_PARK, { variables: { id } });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const { park } = data;

  if (!park) {
    return <p>No Park Found</p>;
  }

  const rides = [...park.rides];

  const orderRides = (orderBy, direction) => {
    if (orderBy === 'name') {
      rides.sort((a, b) => {
        if (a.name < b.name) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a.name > b.name) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else if (orderBy === 'waitTime') {
      rides.sort((a, b) => {
        if (a.waitTime === null && b.waitTime !== null) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a.waitTime !== null && b.waitTime === null) {
          return direction === 'asc' ? 1 : -1;
        }
        if (a.waitTime === null && b.waitTime === null) {
          return 0;
        }
        if (a.waitTime.amount < b.waitTime.amount) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a.waitTime.amount > b.waitTime.amount) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  };

  orderRides('waitTime', 'desc');

  return (
    <>
      <Head>
        <title>{park.name} - DisneyMetaData | Est. 2020</title>
      </Head>
      <h1 className="text-4xl tracking-tight leading-10 font-bold text-gray-900">
        {park.name}
      </h1>
      <p className="text-base text-gray-500">{park.resort.name}</p>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Ride</th>
            <th className="px-4 py-2 text-left">Wait Time</th>
          </tr>
        </thead>
        <tbody>
          {park.rides &&
            park.rides.map(ride => (
              <tr key={ride.id}>
                <td className="border px-4 py-2">
                  <Link href="/rides/[rideId]" as={`/rides/${ride.id}`}>
                    <a>{ride.name}</a>
                  </Link>
                </td>
                <td className="border px-4 py-2">
                  {ride.waitTime && ride.waitTime.status === 'Closed' && (
                    <span className="text-red-500">{ride.waitTime.status}</span>
                  )}
                  {ride.waitTime && ride.waitTime.status !== 'Closed' && (
                    <span>{ride.waitTime.status}</span>
                  )}
                </td>
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
