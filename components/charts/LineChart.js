import PropTypes from 'prop-types';
import { curveCatmullRom } from '@visx/curve';
import { Bar, LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisTop, AxisRight } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { AnimatedGridColumns } from '@visx/react-spring';
import { withTooltip } from '@visx/tooltip';
import { max } from 'd3-array';
import {
  LineChartTooltip,
  LineChartTooltipLine,
  handleTooltip,
} from './LineChartTooltip';
import timeTickFormatter from './util/timeTickFormatter';
import { getX, getY } from './util/data';

const LineChart = ({
  width,
  height,
  data,
  startDate,
  endDate,
  selectedDateOption,
  timezone,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop = 0,
  tooltipLeft = 0,
}) => {
  // X Scale
  const xScale = scaleTime({
    domain: [startDate, endDate],
    range: [0, width - 2],
  });

  // Y Scale
  const maxValue = max(data, getY);
  const intervals =
    maxValue % 5 === 0 ? Math.ceil(maxValue / 5) + 1 : Math.ceil(maxValue / 5);
  const yScale = scaleLinear({
    domain: [0, intervals * 5],
    range: [height - 2, 0],
  });

  return (
    <div>
      <svg width={width} height={height}>
        <GridRows
          scale={yScale}
          numTicks={intervals}
          width={width}
          height={height}
          stroke="#e0e0e0"
        />
        <AnimatedGridColumns
          scale={xScale}
          numTicks={selectedDateOption === 'week' ? 28 : 8}
          width={width}
          height={height}
          stroke="#e0e0e0"
          animationTrajectory="outside"
        />
        <AxisRight
          scale={yScale}
          numTicks={intervals}
          tickFormat={(d, i) => (i !== 0 && i !== intervals ? `${d}` : '')}
        />
        <AxisTop
          top={height}
          scale={xScale}
          numTicks={selectedDateOption === 'week' ? 28 : 8}
          tickFormat={(d, i) =>
            i !== 0 ? timeTickFormatter(selectedDateOption, d, timezone) : ''
          }
          tickLabelProps={() => ({
            angle: '-90',
            dy: '-0.75em',
            dx: '0.85em',
            fontSize: 10,
            textAnchor: 'start',
          })}
        />
        <LinePath
          curve={curveCatmullRom}
          data={data}
          x={(d) => xScale(getX(d)) ?? 0}
          y={(d) => yScale(getY(d)) ?? 0}
          stroke="#8b5cf6"
          strokeWidth={1.5}
          strokeOpacity={1}
          shapeRendering="geometricPrecision"
        />
        <Bar
          x={0}
          y={0}
          width={width}
          height={height}
          fill="transparent"
          onTouchStart={(e) =>
            handleTooltip(e, data, xScale, yScale, showTooltip)
          }
          onTouchMove={(e) =>
            handleTooltip(e, data, xScale, yScale, showTooltip)
          }
          onMouseMove={(e) =>
            handleTooltip(e, data, xScale, yScale, showTooltip)
          }
          onMouseLeave={() => hideTooltip()}
        />
        <LineChartTooltipLine
          height={height}
          tooltipData={tooltipData}
          tooltipTop={tooltipTop}
          tooltipLeft={tooltipLeft}
        />
      </svg>
      <LineChartTooltip
        tooltipData={tooltipData}
        tooltipTop={tooltipTop}
        tooltipLeft={tooltipLeft}
        selectedDateOption={selectedDateOption}
        timezone={timezone}
      />
    </div>
  );
};

LineChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  selectedDateOption: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
  showTooltip: PropTypes.func,
  hideTooltip: PropTypes.func,
  tooltipData: PropTypes.object,
  tooltipTop: PropTypes.number,
  tooltipLeft: PropTypes.number,
};

export default withTooltip(LineChart);
