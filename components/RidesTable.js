import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useTable, useSortBy, useResizeColumns } from 'react-table';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';

const getHeightRestrictionValue = (heightRestriction) =>
  heightRestriction && heightRestriction !== 0 ? `${heightRestriction}"` : '';

const getWaitTimeValue = (waitTime) => {
  if (waitTime === null) {
    return null;
  }
  if (
    waitTime.status === 'Closed' ||
    waitTime.status === 'Refurbishment' ||
    waitTime.status === 'Down'
  ) {
    return waitTime.status;
  }

  return waitTime.amount;
};

const getCellProps = (cellInfo) => {
  if (cellInfo.column.id !== 'waitTime') {
    return {
      className:
        'border px-4 py-2 text-gray-500 group-hover:text-gray-900 group-hover:bg-gray-50',
    };
  }

  switch (cellInfo.value) {
    case 'Closed':
    case 'Down':
      return {
        className:
          'border px-4 py-2 text-red-500 group-hover:text-red-900 group-hover:bg-gray-50',
      };
    case 'Refurbishment':
      return {
        className:
          'border px-4 py-2 text-yellow-500 group-hover:text-yellow-900 group-hover:bg-gray-50',
      };
    default:
      return {
        className:
          'border px-4 py-2 text-green-500 group-hover:text-green-900 group-hover:bg-gray-50',
      };
  }
};

const RidesTable = ({ resortSlug, parkSlug, rides }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      rides.map((ride) => ({
        name: ride.name,
        area: ride.area,
        heightRestriction: getHeightRestrictionValue(ride.heightRestriction),
        fastpass: ride.fastpass,
        riderSwap: ride.riderSwap,
        singleRider: ride.singleRider,
        waitTime: getWaitTimeValue(ride.waitTime),
        slug: ride.slug,
      }))
    );
  }, [rides]);

  const columns = useMemo(
    () => [
      { Header: 'Ride', accessor: 'name' },
      { Header: 'Land', accessor: 'area' },
      { Header: 'Height Restriction', accessor: 'heightRestriction' },
      { Header: 'FastPass+', accessor: 'fastpass' },
      { Header: 'Rider Switch', accessor: 'riderSwap' },
      { Header: 'Single Rider', accessor: 'singleRider' },
      { Header: 'Wait Time', accessor: 'waitTime' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
      useResizeColumns
    );

  return (
    <>
      <table className="table-auto w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="border px-4 py-2 text-left"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="flex justify-between items-center">
                    <span>{column.render('Header')}</span>
                    <span>
                      {column.isSorted && column.isSortedDesc && (
                        <ArrowDownIcon
                          className="text-right -mt-1 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      {column.isSorted && !column.isSortedDesc && (
                        <ArrowUpIcon
                          className="text-right -mt-1 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="group"
                key={`ride_${row.original.id}`}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td
                    className="border px-4 py-2 text-gray-500 group-hover:text-gray-900 group-hover:bg-gray-50"
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                      },
                      getCellProps(cell),
                    ])}
                  >
                    <Link
                      href={`/${resortSlug}/${parkSlug}/${row.original.slug}`}
                    >
                      <a>{cell.render('Cell')}</a>
                    </Link>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

RidesTable.propTypes = {
  resortSlug: PropTypes.string.isRequired,
  parkSlug: PropTypes.string.isRequired,
  rides: PropTypes.array.isRequired,
};

export default RidesTable;
