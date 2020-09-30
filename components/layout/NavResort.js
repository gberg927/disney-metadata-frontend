import PropTypes from 'prop-types';
import NavItem from './NavItem';
import NavPark from './NavPark';

const NavResort = ({ resort, open }) => (
  <>
    <NavItem title={open ? resort.name : resort.abbreviation} open={open} />
    <ul>
      {resort.parks.map(park => (
        <NavPark key={`nav_park_${park.id}`} park={park} open={open} />
      ))}
    </ul>
  </>
);

NavResort.propTypes = {
  resort: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default NavResort;
