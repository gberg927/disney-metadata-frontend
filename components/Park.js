import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { Query } from 'react-apollo';
import Error from './util/Error';
import Loading from './util/Loading';
import { GET_PARK } from '../queries';

import PageHeader from './layout/PageHeader';

const Park = ({ resortSlug, parkSlug }) => (
  <>
    <Query
      query={GET_PARK}
      variables={{
        where: {
          slug: {
            equals: parkSlug,
          },
          resort: {
            slug: {
              equals: resortSlug,
            },
          },
        },
      }}
    >
      {({ data, error, loading }) => {
        console.log(data);
        return (
          <>
            {loading && <Loading />}
            {error && <Error error={error} />}
            {!loading && !error && data && data.parks && (
              <>
                <Head>
                  <title>{data.parks[0].name} | DMD</title>
                </Head>
                <PageHeader title={data.parks[0].name} />
                {data.parks[0].rides.map(ride => (
                  <p>
                    <Link
                      href={`/resorts/${resortSlug}/parks/${parkSlug}/rides/${ride.slug}`}
                    >
                      <a>
                        {ride.waitTime &&
                          ride.waitTime.length > 0 &&
                          `${ride.name} - ${
                            ride.waitTime[0].status === 'Operating'
                              ? `${ride.waitTime[0].amount} minutes`
                              : ride.waitTime[0].status
                          }`}
                        {(!ride.waitTime || ride.waitTime.length === 0) &&
                          `${ride.name}`}
                      </a>
                    </Link>
                  </p>
                ))}
              </>
            )}
          </>
        );
      }}
    </Query>
  </>
);

Park.propTypes = {
  resortSlug: PropTypes.string.isRequired,
  parkSlug: PropTypes.string.isRequired,
};

export default Park;
