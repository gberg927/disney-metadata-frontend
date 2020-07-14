import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query } from 'react-apollo';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import Error from './util/Error';
import Loading from './util/Loading';
import { GET_RIDE } from '../queries';

import PageHeader from './layout/PageHeader';

const Ride = ({ resortSlug, parkSlug, rideSlug }) => (
  <>
    <Query
      query={GET_RIDE}
      variables={{
        where: {
          slug: {
            equals: rideSlug,
          },
          park: {
            slug: {
              equals: parkSlug,
            },
            resort: {
              slug: {
                equals: resortSlug,
              },
            },
          },
        },
      }}
    >
      {({ data, error, loading }) => {
        if (error) return <Error error={error} />;
        if (loading) return <Loading />;
        if (!data || !data.rides) return <Error error="No Ride Found" />;
        const ride = data.rides[0];
        const chartLabels = ride.waitTimes.map(function(e) {
          return format(new Date(e.timestamp), 'hh:mm aa');
        });
        const chartValues = ride.waitTimes.map(function(e) {
          return e.amount;
        });
        const chartData = {
          labels: chartLabels,
          datasets: [
            {
              label: ride.name,
              data: chartValues,
              backgroundColor: ['rgba(75, 192, 192, 0.6)'],
              borderWidth: 4,
            },
          ],
        };
        return (
          <>
            <Head>
              <title>{ride.name} | DMD</title>
            </Head>
            <PageHeader title={ride.name} />
            {ride.openedOn && (
              <div>
                <i>Opened on: {ride.openedOn}</i>
              </div>
            )}
            {ride.area && (
              <div>
                <p>Found in: {ride.area}</p>
              </div>
            )}
            {ride.duration && (
              <div>
                <p>Duration: {ride.duration} minutes</p>
              </div>
            )}
            {ride.heightRestriction && (
              <div>
                <p>Height Restriction: {ride.heightRestriction}</p>
              </div>
            )}
            {ride.fastPass && (
              <div>
                <p>Fastpass +: {ride.fastPass}</p>
              </div>
            )}
            {ride.singleRider && (
              <div>
                <p>Single Ride: {ride.singleRider}</p>
              </div>
            )}
            {ride.riderSwap && (
              <div>
                <p>Rider Swap: {ride.riderSwap}</p>
              </div>
            )}
            <Line data={chartData} />
          </>
        );
      }}
    </Query>
  </>
);

Ride.propTypes = {
  resortSlug: PropTypes.string.isRequired,
  parkSlug: PropTypes.string.isRequired,
  rideSlug: PropTypes.string.isRequired,
};

export default Ride;
