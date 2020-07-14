import { useRouter } from 'next/router';
import Resort from '../../../components/Resort';

const ResortPage = () => {
  const router = useRouter();
  const { resortSlug } = router.query;

  return <Resort resortSlug={resortSlug} />;
};

export default ResortPage;
