import { useRouter } from 'next/router';
import ResortSlug from '../components/ResortSlug';
import ParkSlug from '../components/ParkSlug';
import RideSlug from '../components/RideSlug';

const CatchAll = () => {
  const router = useRouter();
  const { slug: slugs } = router.query;

  return (
    <>
      {slugs && slugs.length === 1 && <ResortSlug slug={slugs[0]} />}
      {slugs && slugs.length === 2 && (
        <ParkSlug slug={slugs[1]} resortSlug={slugs[0]} />
      )}
      {slugs && slugs.length === 3 && (
        <RideSlug slug={slugs[2]} parkSlug={slugs[1]} resortSlug={slugs[0]} />
      )}
    </>
  );
};

export default CatchAll;
