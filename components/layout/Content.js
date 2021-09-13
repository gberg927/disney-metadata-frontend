import PropTypes from 'prop-types';

const Content = ({ children }) => (
  <main className="mx-auto px-4 py-6">{children}</main>
);

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Content;
