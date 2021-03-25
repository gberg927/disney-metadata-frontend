import { useMutation } from '@apollo/client';
import { CURRENT_USER, LOGOUT } from '../../queries';

const Logout = () => {
  const [logout] = useMutation(LOGOUT, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  return (
    <button
      className="text-purple-500 hover:text-purple-900"
      type="button"
      onClick={logout}
    >
      Log Out
    </button>
  );
};

export default Logout;
