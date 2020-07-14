import Head from 'next/head';
import Link from 'next/link';
import { Query } from 'react-apollo';
import Error from './util/Error';
import Loading from './util/Loading';
import { LIST_RESORTS } from '../queries';

import PageHeader from './layout/PageHeader';

const Resorts = () => (
  <>
    <Head>
      <title>Resorts | DMD</title>
    </Head>
    <PageHeader title="Resorts" />
    <Query query={LIST_RESORTS}>
      {({ data, error, loading }) => (
        <>
          {loading && <Loading />}
          {error && <Error error={error} />}
          {!loading &&
            !error &&
            data &&
            data.resorts &&
            data.resorts.map(resort => (
              <p>
                <Link href={`/resorts/${resort.slug}`}>
                  <a>{`${resort.name}`}</a>
                </Link>
              </p>
            ))}
        </>
      )}
    </Query>
  </>
);

export default Resorts;
