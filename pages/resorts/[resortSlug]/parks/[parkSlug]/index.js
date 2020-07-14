import { useRouter } from 'next/router';
import Park from '../../../../../components/Park';

const ParkPage = () => {
  const router = useRouter();
  const { resortSlug, parkSlug } = router.query;

  return <Park resortSlug={resortSlug} parkSlug={parkSlug} />;
};

export default ParkPage;
