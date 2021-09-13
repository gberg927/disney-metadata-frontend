import PropTypes from 'prop-types';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import {
  CheckCircleIcon,
  ExclamationIcon,
  StatusOfflineIcon,
  XCircleIcon,
  ClockIcon,
  LightningBoltIcon,
  SwitchHorizontalIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import Error from './util/Error';
import Loading from './util/Loading';
import WaitTimeGraph from './WaitTimeGraph';
import { GET_RIDE_BY_SLUG } from '../queries';

const RideSlug = ({ slug, parkSlug, resortSlug }) => {
  const { loading, error, data } = useQuery(GET_RIDE_BY_SLUG, {
    variables: {
      slug,
      parkSlug,
      resortSlug,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const { rides } = data;

  if (!rides && rides.length !== 1) {
    return <p>No Park Found</p>;
  }
  const ride = rides[0];

  return (
    <>
      <Head>
        <title>{ride.name} - DisneyMetaData | Est. 2020</title>
      </Head>
      <div className="pb-4">
        <h1 className="text-4xl tracking-tight leading-10 font-bold text-gray-900">
          {ride.name}
        </h1>
        <p className="text-base text-gray-500">
          {ride.area && `${ride.area}, `}
          {ride.park.name} - {ride.park.resort.name}
        </p>
      </div>

      {ride.category && ride.category === 'RIDE' && (
        <>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 pb-4">
            <div className="flex items-center bg-gray-50 shadow overflow-hidden rounded-lg px-2 py-2">
              {ride.waitTime &&
                (ride.waitTime.status === 'Closed' ||
                  ride.waitTime.status === 'Down') && (
                  <div className="p-3 mr-4 sm:mr-6 text-red-900 bg-red-500 rounded-full">
                    <XCircleIcon className="w-6 h-6" aria-hidden="true" />
                  </div>
                )}
              {ride.waitTime && ride.waitTime.status === 'Refurbishment' && (
                <div className="p-3 mr-4 sm:mr-6 text-yellow-900 bg-yellow-500 rounded-full">
                  <ExclamationIcon className="w-6 h-6" aria-hidden="true" />
                </div>
              )}
              {ride.waitTime && ride.waitTime.status === 'Operating' && (
                <div className="p-3 mr-4 sm:mr-6 text-green-900 bg-green-500 rounded-full">
                  <CheckCircleIcon className="w-6 h-6" aria-hidden="true" />
                </div>
              )}
              {ride.waitTime &&
                ride.waitTime.status !== 'Closed' &&
                ride.waitTime.status !== 'Down' &&
                ride.waitTime.status !== 'Refurbishment' &&
                ride.waitTime.status !== 'Operating' && (
                  <div className="p-3 mr-4 sm:mr-6 text-gray-900 bg-gray-500 rounded-full">
                    <StatusOfflineIcon className="w-6 h-6" aria-hidden="true" />
                  </div>
                )}
              {!ride.waitTime && (
                <div className="p-3 mr-4 sm:mr-6 text-gray-900 bg-gray-500 rounded-full">
                  <StatusOfflineIcon className="w-6 h-6" aria-hidden="true" />
                </div>
              )}

              <div>
                <div className="flex flex-col justify-between h-16">
                  <h5 className="text-lg leading-6 font-bold uppercase text-gray-600">
                    Status
                  </h5>
                  <h3 className="mt-1 max-w-2xl font-bold text-3xl">
                    {ride.waitTime &&
                      (ride.waitTime.status === 'Closed' ||
                        ride.waitTime.status === 'Down') && (
                        <span className="text-red-500 group-hover:text-red-900">
                          {ride.waitTime.status}
                        </span>
                      )}
                    {ride.waitTime &&
                      ride.waitTime.status === 'Refurbishment' && (
                        <span className="text-yellow-500">
                          {ride.waitTime.status}
                        </span>
                      )}
                    {ride.waitTime && ride.waitTime.status === 'Operating' && (
                      <span className="text-green-500">
                        {ride.waitTime.amount} min
                      </span>
                    )}
                    {ride.waitTime &&
                      ride.waitTime.status !== 'Closed' &&
                      ride.waitTime.status !== 'Down' &&
                      ride.waitTime.status !== 'Refurbishment' &&
                      ride.waitTime.status !== 'Operating' && (
                        <span className="text-gray-500">
                          {ride.waitTime.status}
                        </span>
                      )}
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex items-center bg-gray-50 shadow overflow-hidden rounded-lg px-2 py-2">
              <div className="p-3 mr-4 sm:mr-6 text-gray-900 bg-gray-500 rounded-full">
                <ClockIcon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <div className="flex flex-col justify-between h-16">
                  <h5 className="text-lg leading-6 font-bold uppercase text-gray-600">
                    Duration
                  </h5>
                  <h3 className="mt-1 max-w-2xl font-bold text-3xl">
                    {ride.duration && `${ride.duration} min`}
                    {!ride.duration && `N/A`}
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex items-center bg-gray-50 shadow overflow-hidden rounded-lg px-2 py-2">
              {ride.fastPass && (
                <div className="p-3 mr-4 sm:mr-6 text-green-900 bg-green-500 rounded-full">
                  <LightningBoltIcon className="w-6 h-6" aria-hidden="true" />
                </div>
              )}
              {!ride.fastPass && (
                <div className="p-3 mr-4 sm:mr-6 text-red-900 bg-red-500 rounded-full">
                  <LightningBoltIcon className="w-6 h-6" aria-hidden="true" />
                </div>
              )}
              <div className="flex flex-col justify-between h-16">
                <h5 className="text-lg leading-6 font-bold uppercase text-gray-600">
                  FastPass+
                </h5>
                <h3 className="mt-1 max-w-2xl font-bold text-3xl">
                  <>&nbsp;</>
                </h3>
              </div>
            </div>

            <div className="flex items-center bg-gray-50 shadow overflow-hidden rounded-lg px-2 py-2">
              {ride.riderSwap && (
                <div className="p-3 mr-4 sm:mr-6 text-green-900 bg-green-500 rounded-full">
                  <SwitchHorizontalIcon
                    className="w-6 h-6"
                    aria-hidden="true"
                  />
                </div>
              )}
              {!ride.riderSwap && (
                <div className="p-3 mr-4 sm:mr-6 text-red-900 bg-red-500 rounded-full">
                  <SwitchHorizontalIcon
                    className="w-6 h-6"
                    aria-hidden="true"
                  />
                </div>
              )}

              <div>
                <div className="flex flex-col justify-between h-16">
                  <h5 className="text-lg leading-6 font-bold uppercase text-gray-600">
                    Rider Switch
                  </h5>
                  <h3 className="mt-1 max-w-2xl font-bold text-3xl">
                    <>&nbsp;</>
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex items-center bg-gray-50 shadow overflow-hidden rounded-lg px-2 py-2">
              {ride.singleRider && (
                <div className="p-3 mr-4 sm:mr-6 text-green-900 bg-green-500 rounded-full">
                  <UserCircleIcon className="w-6 h-6" aria-hidden="true" />
                </div>
              )}
              {!ride.singleRider && (
                <div className="p-3 mr-4 sm:mr-6 text-red-900 bg-red-500 rounded-full">
                  <UserCircleIcon className="w-6 h-6" aria-hidden="true" />
                </div>
              )}
              <div>
                <div className="flex flex-col justify-between h-16">
                  <h5 className="text-lg leading-6 font-bold uppercase text-gray-600">
                    Single Rider
                  </h5>
                  <h3 className="mt-1 max-w-2xl font-bold text-3xl">
                    <>&nbsp;</>
                  </h3>
                </div>
              </div>
            </div>
            <WaitTimeGraph ride={ride} />
          </div>
        </>
      )}
    </>
  );
};

RideSlug.propTypes = {
  slug: PropTypes.string.isRequired,
  parkSlug: PropTypes.string.isRequired,
  resortSlug: PropTypes.string.isRequired,
};

export default RideSlug;
