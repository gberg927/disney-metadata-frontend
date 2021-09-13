const timeTickFormatter = (selectedDateOption, d, timezone) => {
  switch (selectedDateOption) {
    case 'week':
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: timezone,
      }).format(d);
    case 'yesterday':
    case 'today':
    default:
      return new Intl.DateTimeFormat('en-US', {
        timeStyle: 'short',
        timeZone: timezone,
      }).format(d);
  }
};

export default timeTickFormatter;
