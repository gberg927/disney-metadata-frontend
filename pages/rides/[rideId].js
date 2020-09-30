import { useRouter } from 'next/router';
import Ride from '../../components/Ride';

const RidePage = () => {
  const router = useRouter();
  const rideId = parseInt(router.query.rideId);

  return <Ride id={rideId} />;
};

export default RidePage;
