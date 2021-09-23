import PropTypes from 'prop-types';

const RideStatusText = ({ status, amount }) => (
  <>
    {(status === 'Closed' || status === 'Down') && (
      <span className="text-red-500">{status}</span>
    )}
    {status === 'Refurbishment' && (
      <span className="text-yellow-500">{status}</span>
    )}
    {status === 'Operating' && (
      <span className="text-green-500">{amount} min</span>
    )}
    {status === null ||
      status === '' ||
      (status !== 'Closed' &&
        status !== 'Down' &&
        status !== 'Refurbishment' &&
        status !== 'Operating' && (
          <span className="text-gray-500">{status}</span>
        ))}
  </>
);

RideStatusText.propTypes = {
  status: PropTypes.string,
  amount: PropTypes.number,
};

export default RideStatusText;
