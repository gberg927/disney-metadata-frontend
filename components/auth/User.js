import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../../queries';

const CurrentUser = () => {
  const { data } = useQuery(CURRENT_USER);
  return data && data.currentUser;
};

export default CurrentUser;
