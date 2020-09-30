import React from 'react';
import PropTypes from 'prop-types';

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div className="p-4 border-red-500 border-4 rounded" key={i}>
        <p data-test="graphql-error">
          <strong>Error: </strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ));
  }
  return (
    <div className="p-4 border-red-500 border-4 rounded">
      <p data-test="graphql-error">
        <strong>Error: </strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
