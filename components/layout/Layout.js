import PropTypes from 'prop-types';
import Link from 'next/link';
import Meta from './Meta';
import Nav from './Nav';

const Layout = ({ children }) => (
  <div className="flex">
    <Meta />
    <Nav />
    <div className="flex flex-col flex-grow">
      <header className="flex flex-col p-4 border-b">
        <Link href="/">
          <a className="text-4xl">Disney MetaData</a>
        </Link>
      </header>
      <main className="p-4">{children}</main>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
