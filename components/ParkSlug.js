import PropTypes from 'prop-types';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import RidesTable from './RidesTable';
import Error from './util/Error';
import Loading from './util/Loading';
import { GET_PARK_BY_SLUG } from '../queries';

const ParkSlug = ({ slug, resortSlug }) => {
  const { loading, error, data } = useQuery(GET_PARK_BY_SLUG, {
    variables: { slug, resortSlug },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const { parks } = data;

  if (!parks && parks.length !== 1) {
    return <p>No Park Found</p>;
  }
  const park = parks[0];

  return (
    <>
      <Head>
        <title>{park.name} - DisneyMetaData | Est. 2020</title>
      </Head>
      <h1 className="text-4xl tracking-tight leading-10 font-bold text-gray-900">
        {park.name}
      </h1>
      <p className="text-base text-gray-500">{park.resort.name}</p>
      <RidesTable resortSlug={resortSlug} parkSlug={slug} rides={park.rides} />
    </>
  );
};

ParkSlug.propTypes = {
  slug: PropTypes.string.isRequired,
  resortSlug: PropTypes.string.isRequired,
};

export default ParkSlug;
