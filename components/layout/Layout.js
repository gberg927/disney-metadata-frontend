import PropTypes from 'prop-types';
import Link from 'next/link';
import currentUser from '../auth/User';
import Meta from './Meta';
import Nav from './Nav';
import Logout from '../auth/Logout';

const Layout = ({ children }) => {
  const user = currentUser();
  return (
    <div className="flex">
      <Meta />
      <Nav />
      <div className="flex flex-col flex-grow">
        <header className="flex justify-between items-center p-4 border-b">
          <Link href="/">
            <a className="text-4xl">Disney MetaData</a>
          </Link>
          <div className="flex items-end">
            {!user && (
              <Link href="/login">
                <a className="text-purple-500 hover:bg-purple-500 hover:text-white">
                  Login
                </a>
              </Link>
            )}
            {user && (
              <>
                <span className="mr-2">Welcome {user.email}</span>
                <Logout />
              </>
            )}
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
