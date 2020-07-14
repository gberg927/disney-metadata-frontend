import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { Query } from 'react-apollo';
import Error from './util/Error';
import Loading from './util/Loading';
import { GET_RESORT } from '../queries';

import PageHeader from './layout/PageHeader';

const Resort = ({ resortSlug }) => (
  <>
    <Query
      query={GET_RESORT}
      variables={{ where: { slug: { equals: resortSlug } } }}
    >
      {({ data, error, loading }) => (
        <>
          {loading && <Loading />}
          {error && <Error error={error} />}
          {!loading && !error && data && data.resorts && (
            <>
              <Head>
                <title>{data.resorts[0].name} | DMD</title>
              </Head>
              <PageHeader title={data.resorts[0].name} />
              {data.resorts[0].parks.map(park => (
                <p>
                  <Link href={`/resorts/${resortSlug}/parks/${park.slug}`}>
                    <a>{`${park.name}`}</a>
                  </Link>
                </p>
              ))}
            </>
          )}
        </>
      )}
    </Query>
  </>
);

Resort.propTypes = {
  resortSlug: PropTypes.string.isRequired,
};

export default Resort;
