import PropTypes from 'prop-types';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Error from './util/Error';
import Loading from './util/Loading';
import { GET_RESORT_BY_SLUG } from '../queries';

const ResortSlug = ({ slug }) => {
  const { loading, error, data } = useQuery(GET_RESORT_BY_SLUG, {
    variables: { slug },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const { resorts } = data;

  if (!resorts && resorts.length !== 1) {
    return <p>No Resort Found</p>;
  }
  const resort = resorts[0];

  return (
    <>
      <Head>
        <title>{resort.name} - DisneyMetaData | Est. 2020</title>
      </Head>
      <h1 className="text-4xl tracking-tight leading-10 font-bold text-gray-900">
        {resort.name}
      </h1>
      <h3 className="text-lg tracking-tight leading-10 text-gray-900">Parks</h3>
      <div className="flex flex-col">
        {resort.parks &&
          resort.parks.map((park) => (
            <Link href={`/${resort.slug}/${park.slug}`}>
              <a title={park.name}>
                <button
                  type="button"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  <span>{park.name}</span>
                </button>
              </a>
            </Link>
          ))}
      </div>
    </>
  );
};

ResortSlug.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default ResortSlug;
