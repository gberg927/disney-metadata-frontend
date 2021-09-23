import PropTypes from 'prop-types';
import Link from 'next/link';
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/solid';

const NavSmall = ({ resorts, slugKey }) => (
  <>
    {resorts.map((resort) => (
      <>
        <div className="px-2 border-gray-900 border-t-2 border-b-2">
          <Link key={`nav_resort_${resort.slug}`} href={`/${resort.slug}`}>
            <a
              className={`text-xl font-bold block py-2 rounded-md ${
                `${resort.slug}_` === slugKey
                  ? 'text-purple-500 tracking-widest'
                  : 'text-gray-500'
              } hover:bg-gray-700 hover:text-white`}
              title={resort.name}
            >
              {resort.name}
            </a>
          </Link>
        </div>

        {resort.parks.map((park, index) => (
          <div
            className={`px-2 ${
              index !== resort.parks.length - 1 ? 'border-b' : ''
            }`}
          >
            <Link
              key={`nav_park_${park.slug}`}
              href={`/${resort.slug}/${park.slug}`}
            >
              <a
                className={`text-base font-medium block py-2 rounded-md ${
                  `${resort.slug}_${park.slug}` === slugKey
                    ? 'text-purple-500 tracking-widest'
                    : 'text-gray-500'
                } hover:bg-gray-700 hover:text-white`}
                title={park.name}
              >
                {park.name}
              </a>
            </Link>
          </div>
        ))}
      </>
    ))}
  </>
);

NavSmall.propTypes = {
  resorts: PropTypes.array.isRequired,
  slugKey: PropTypes.object.isRequired,
};

const NavLarge = ({ resorts, slugKey, selectedResort, setSelectedResort }) => (
  <>
    <div className="flex justify-between items-center space-x-5 lg:space-x-10 mb-2 border-b border-opacity-60">
      {resorts.map((resort) => (
        <Link key={`nav_resort_${resort.slug}`} href={`/${resort.slug}`}>
          <a title={resort.name}>
            <button
              type="button"
              className={`flex text-lg group items-center font-medium ${
                `${resort.slug}_` === slugKey
                  ? 'text-purple-500 tracking-widest'
                  : 'text-gray-500'
              } hover:text-gray-900`}
              onMouseEnter={() => setSelectedResort(resort)}
            >
              <span className="sm:hidden md:inline-flex">{resort.name}</span>
              <span className="sm:inline-flex md:hidden">
                {resort.abbreviation}
              </span>
              {resort === selectedResort && (
                <ChevronDownIcon
                  className="text-white bg-purple-500 rounded-md shadow-sm ml-2 -mt-1 h-5 w-5"
                  aria-hidden="true"
                />
              )}
              {resort !== selectedResort && (
                <ChevronLeftIcon
                  className="text-gray-500 ml-2 -mt-1 h-5 w-5 group-hover:text-gray-900"
                  aria-hidden="true"
                />
              )}
            </button>
          </a>
        </Link>
      ))}
    </div>
    <div className="flex justify-around items-center space-x-10">
      {selectedResort &&
        selectedResort.parks.map((park) => (
          <Link
            key={`nav_park_${park.slug}`}
            href={`/${selectedResort.slug}/${park.slug}`}
          >
            <a title={park.name}>
              <button
                type="button"
                className={`text-base font-medium ${
                  `${selectedResort.slug}_${park.slug}` === slugKey
                    ? 'text-purple-500 tracking-widest'
                    : 'text-gray-500'
                } hover:text-gray-900`}
              >
                <span>{park.name}</span>
              </button>
            </a>
          </Link>
        ))}
    </div>
  </>
);

NavLarge.propTypes = {
  resorts: PropTypes.array.isRequired,
  slugKey: PropTypes.object.isRequired,
  selectedResort: PropTypes.object.isRequired,
  setSelectedResort: PropTypes.func.isRequired,
};

export { NavSmall, NavLarge };
