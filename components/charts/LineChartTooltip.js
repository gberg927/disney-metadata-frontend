import PropTypes from 'prop-types';
import { TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { Line } from '@visx/shape';
import RideStatusIcon from '../RideStatusIcon';
import RideStatusText from '../RideStatusText';
import timeTickFormatter from './util/timeTickFormatter';
import { getX, getY, getStatus, bisectDate } from './util/data';

const handleTooltip = (event, data, xScale, yScale, showTooltip) => {
  const { x } = localPoint(event) || { x: 0 };
  const x0 = xScale.invert(x);
  const index = bisectDate(data, x0, 1);
  const d0 = data[index - 1];
  const d1 = data[index];
  let d = d0;
  if (d1 && getX(d1)) {
    d =
      x0.valueOf() - getX(d0).valueOf() > getX(d1).valueOf() - x0.valueOf()
        ? d1
        : d0;
  }
  showTooltip({
    tooltipData: d,
    tooltipLeft: x,
    tooltipTop: yScale(getY(d)),
  });
};

const LineChartTooltipLine = ({
  height,
  tooltipData,
  tooltipTop = 0,
  tooltipLeft = 0,
}) => (
  <>
    {tooltipData && (
      <g>
        <Line
          from={{ x: tooltipLeft, y: 0 }}
          to={{ x: tooltipLeft, y: height }}
          stroke="#8b5cf6"
          strokeWidth={2}
          pointerEvents="none"
          strokeDasharray="5,2"
        />
        <circle
          cx={tooltipLeft}
          cy={tooltipTop + 1}
          r={4}
          fill="black"
          fillOpacity={0.1}
          stroke="black"
          strokeOpacity={0.1}
          strokeWidth={2}
          pointerEvents="none"
        />
        <circle
          cx={tooltipLeft}
          cy={tooltipTop}
          r={4}
          fill="#8b5cf6"
          stroke="white"
          strokeWidth={2}
          pointerEvents="none"
        />
      </g>
    )}
  </>
);

LineChartTooltipLine.propTypes = {
  height: PropTypes.number.isRequired,
  tooltipData: PropTypes.object,
  tooltipTop: PropTypes.number,
  tooltipLeft: PropTypes.number,
};

const LineChartTooltip = ({
  tooltipData,
  tooltipTop = 0,
  tooltipLeft = 0,
  selectedDateOption,
  timezone,
}) => (
  <>
    {tooltipData && (
      <TooltipWithBounds
        key={Math.random()}
        top={tooltipTop}
        left={tooltipLeft}
        style={defaultStyles}
      >
        <div className="p-2 flex items-center">
          <div className="mr-2">
            <RideStatusIcon status={getStatus(tooltipData)} />
          </div>
          <div className="flex flex-row md:flex-col justify-center items-start">
            <h5 className="font-bold text-gray-600">
              {timeTickFormatter(
                selectedDateOption,
                getX(tooltipData),
                timezone
              )}
            </h5>
            <h3>
              <RideStatusText
                status={getStatus(tooltipData)}
                amount={getY(tooltipData)}
              />
            </h3>
          </div>
        </div>
      </TooltipWithBounds>
    )}
  </>
);

LineChartTooltip.propTypes = {
  tooltipData: PropTypes.object,
  tooltipTop: PropTypes.number,
  tooltipLeft: PropTypes.number,
  selectedDateOption: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
};

export { LineChartTooltip, LineChartTooltipLine, handleTooltip };
