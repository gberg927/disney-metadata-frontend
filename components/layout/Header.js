import Link from 'next/link';
import { useMutation } from '@apollo/client';
import Nav from './Nav';
import currentUser from '../auth/User';
import { CURRENT_USER, LOGOUT } from '../../queries';

const Header = () => {
  const user = currentUser();
  const [logout] = useMutation(LOGOUT, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  return (
    <header>
      <div className="flex flex-col px-4 pt-6 pb-2 border-b">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <a title="Theme Park Stats">
              <div className="flex justify-start items-center h-9 mt-2">
                <svg
                  className="stroke-black fill-purple h-9 mr-1 mb-3"
                  viewBox="0 0 24 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.5 8.5L1 26H9.5H14.5H22.5L23 2L14.5 16L9.5 8.5Z" />
                </svg>
                <span className="text-4xl font-bold whitespace-nowrap">
                  Theme Park Stats
                </span>
              </div>
            </a>
          </Link>
          <div>
            {!user && (
              <Link href="/login">
                <a className="px-4 py-2 rounded-md shadow-sm text-base font-medium text-white bg-purple-500 hover:bg-purple-600">
                  Login
                </a>
              </Link>
            )}
            {user && (
              <>
                <span className="mr-2">Welcome {user.email}</span>
                <button
                  type="button"
                  className="px-4 py-2 rounded-md shadow-sm text-base font-medium text-white bg-purple-500 hover:bg-purple-600"
                  onClick={logout}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
