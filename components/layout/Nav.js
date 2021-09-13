import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import { RESORTS } from '../../queries';

const Nav = () => {
  const [selectedResort, setSelectedResort] = useState();
  const { loading, error, data } = useQuery(RESORTS, {
    onCompleted: () => {
      setSelectedResort(data.resorts.find((resort) => resort.slug === 'wdw'));
    },
  });

  if (loading || error) return <></>;
  const { resorts } = data;

  return (
    <nav>
      <div className="flex justify-between items-center space-x-10 mb-2 border-b border-opacity-60">
        {resorts.map((resort) => (
          <Link key={`nav_resort_${resort.slug}`} href={`/${resort.slug}`}>
            <a title={resort.name}>
              <button
                type="button"
                className="text-gray-500 text-lg group bg-white rounded-md inline-flex items-center font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onMouseEnter={() => setSelectedResort(resort)}
              >
                <span>{resort.name}</span>
                {resort === selectedResort && (
                  <ChevronDownIcon
                    className="rounded-md shadow-sm text-white bg-purple-500 ml-2 -mt-1 h-5 w-5"
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
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  <span>{park.name}</span>
                </button>
              </a>
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default Nav;
