import PropTypes from 'prop-types';
import NavItem from './NavItem';

const NavPark = ({ park, open }) => (
  <NavItem
    title={open ? park.name : park.abbreviation}
    href="/parks/[parkId]"
    hrefAs={`/parks/${park.id}`}
    nested
    open={open}
  />
);

NavPark.propTypes = {
  park: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default NavPark;
