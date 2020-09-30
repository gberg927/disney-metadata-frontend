import { useRouter } from 'next/router';
import Park from '../../components/Park';

const ParkPage = () => {
  const router = useRouter();
  const parkId = parseInt(router.query.parkId);

  return <Park id={parkId} />;
};

export default ParkPage;
