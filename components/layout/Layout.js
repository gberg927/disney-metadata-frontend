import PropTypes from 'prop-types';
import Meta from './Meta';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div>
    <Meta />
    <Header />
    <Content>{children}</Content>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
