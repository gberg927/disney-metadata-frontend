import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import LineChart from './charts/LineChart';
import getDateCriteria, { options } from './charts/util/dateCriteria';
import { GET_WAITTIMES } from '../queries';

const WaitTimeGraph = ({ ride }) => {
  const [selectedDateOption, setSelectedDateOption] = useState('today');
  const [dateCriteria, setDateCriteria] = useState({});
  const [waitTimes, setWaitTimes] = useState([]);

  const { data } = useQuery(GET_WAITTIMES, {
    variables: {
      rideId: ride.id,
      startDate: dateCriteria.startDate,
      endDate: dateCriteria.endDate,
    },
  });

  useEffect(() => {
    if (data) {
      const values = data.waitTimes.map((waitTime) => ({
        date: new Date(waitTime.timestamp),
        value: waitTime.amount,
        status: waitTime.status,
      }));
      setWaitTimes(values);
    }
  }, [data]);

  useEffect(() => {
    setDateCriteria(getDateCriteria(selectedDateOption, ride.park.timezone));
  }, [ride.park.timezone, selectedDateOption]);

  return (
    <div className="col-span-5 flex flex-col bg-gray-50 shadow overflow-hidden rounded-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h5 className="text-lg leading-6 font-bold uppercase text-gray-600">
          Wait Times
        </h5>
        <div className="flex items-center">
          <select
            id="waitTimesLength"
            name="waitTimesLength"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            value={selectedDateOption}
            onChange={(e) => setSelectedDateOption(e.target.value)}
          >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-4">
        <LineChart
          data={waitTimes}
          startDate={dateCriteria.startDate}
          endDate={dateCriteria.endDate}
          selectedDateOption={selectedDateOption}
          timezone={ride.park.timezone}
        />
      </div>
    </div>
  );
};
WaitTimeGraph.propTypes = {
  ride: PropTypes.object.isRequired,
};

export default WaitTimeGraph;
