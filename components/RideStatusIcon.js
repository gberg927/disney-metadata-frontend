import PropTypes from 'prop-types';
import {
  CheckCircleIcon,
  ExclamationIcon,
  StatusOfflineIcon,
  XCircleIcon,
} from '@heroicons/react/solid';

const RideStatusIcon = ({ status }) => (
  <>
    {(status === 'Closed' || status === 'Down') && (
      <div className="flex justify-center items-center p-2 text-red-900 bg-red-500 rounded-full">
        <XCircleIcon className="w-6 h-6" aria-hidden="true" />
      </div>
    )}
    {status === 'Refurbishment' && (
      <div className="flex justify-center items-center p-2 text-yellow-900 bg-yellow-500 rounded-full">
        <ExclamationIcon className="w-6 h-6" aria-hidden="true" />
      </div>
    )}
    {status === 'Operating' && (
      <div className="flex justify-center items-center p-2 text-green-900 bg-green-500 rounded-full">
        <CheckCircleIcon className="w-6 h-6" aria-hidden="true" />
      </div>
    )}
    {status === null ||
      status === '' ||
      (status !== 'Closed' &&
        status !== 'Down' &&
        status !== 'Refurbishment' &&
        status !== 'Operating' && (
          <div className="flex justify-center items-center p-2 text-gray-900 bg-gray-500 rounded-full">
            <StatusOfflineIcon className="w-6 h-6" aria-hidden="true" />
          </div>
        ))}
  </>
);

RideStatusIcon.propTypes = {
  status: PropTypes.string,
};

export default RideStatusIcon;
