import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const HomePage = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    fetch(
      'http://localhost:5000/api/resorts/wdw/parks/magic-kingdom/rides/splash-mountain/waittimes'
    )
      .then(response => response.json())
      .then(data => {
        const labels = data.waitTimes.map(function(e) {
          return format(new Date(e.timestamp), 'hh:mm aa');
          // return e.timestamp;
        });
        const values = data.waitTimes.map(function(e) {
          return e.amount;
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'Splash Mountain',
              data: values,
              backgroundColor: ['rgba(75, 192, 192, 0.6)'],
              borderWidth: 4,
            },
          ],
        });
      });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <>
      <Line data={chartData} />
      <div>Welcome to Next.js!</div>
    </>
  );
};

export default HomePage;
