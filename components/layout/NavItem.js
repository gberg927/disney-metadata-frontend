import PropTypes from 'prop-types';
import Link from 'next/link';

const NavItem = ({ title, href, hrefAs, nested, open }) => (
  <>
    {!href && (
      <li
        className={`p-2 rounded flex items-center ${
          open ? 'justify-left' : 'justify-center'
        } bg-transparent text-gray-900 ${nested && 'ml-4'}`}
      >
        <p className="text-lg leading-6 font-medium">{title}</p>
      </li>
    )}
    {href && (
      <Link
        href={href}
        as={hrefAs}
        className="text-base leading-6 font-normal text-gray-900"
      >
        <a>
          <li
            className={`p-2 rounded flex items-center ${
              open ? 'justify-left' : 'justify-center'
            } transition duration-200 ease-in-out bg-transparent hover:bg-purple-500 text-gray-900 hover:text-white ${nested &&
              'ml-4'}`}
          >
            {title}
          </li>
        </a>
      </Link>
    )}
  </>
);

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  hrefAs: PropTypes.string,
  nested: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
};

export default NavItem;
