import { useRouter } from 'next/router';
import Ride from '../../../../../../../components/Ride';

const RidePage = () => {
  const router = useRouter();
  const { resortSlug, parkSlug, rideSlug } = router.query;

  return (
    <Ride resortSlug={resortSlug} parkSlug={parkSlug} rideSlug={rideSlug} />
  );
};

export default RidePage;
