import { useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import timeTickFormatter from './util/timeTickFormatter';

const LineChart = ({
  data,
  startDate,
  endDate,
  selectedDateOption,
  timezone,
}) => {
  const width = 900;
  const height = 200;
  const svgRef = useRef(null);

  const svg = d3.select(svgRef.current);
  svg.selectAll('*').remove();
  svg.attr('viewBox', [0, 0, width, height]);

  // X
  const xScale = d3
    .scaleTime()
    .domain([startDate, endDate])
    .range([0, width - 1]);
  const xAxis = svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(
      d3
        .axisTop(xScale)
        .ticks(selectedDateOption === 'week' ? 28 : d3.timeMinute.every(60))
        .tickFormat((d) => timeTickFormatter(selectedDateOption, d, timezone))
        .tickSizeOuter(0)
    );
  xAxis.select('.tick:first-of-type').remove();
  xAxis
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('opacity', 0.75)
    .attr('font-size', '0.5rem')
    .attr('transform', 'translate(6, -3) rotate(-90)');

  // Y
  const maxValue = d3.max(data, (d) => d.value);
  const intervals =
    maxValue % 5 === 0 ? Math.ceil(maxValue / 5) + 1 : Math.ceil(maxValue / 5);
  const yScale = d3
    .scaleLinear()
    .domain([0, intervals * 5])
    .range([height - 1, 0]);
  const yAxis = svg
    .append('g')
    .call(d3.axisRight(yScale).ticks(intervals).tickSizeOuter(0));
  yAxis.select('.tick:first-of-type').remove();
  yAxis.select('.tick:last-of-type').remove();

  // Grid
  svg
    .append('g')
    .attr('stroke', 'currentColor')
    .attr('stroke-opacity', 0.1)
    .call((g) =>
      g
        .append('g')
        .selectAll('line')
        .data(
          xScale.ticks(
            selectedDateOption === 'week' ? 28 : d3.timeMinute.every(60)
          )
        )
        .join('line')
        .attr('x1', (d) => 0.5 + xScale(d))
        .attr('x2', (d) => 0.5 + xScale(d))
        .attr('y1', 0)
        .attr('y2', height)
    )
    .call((g) =>
      g
        .append('g')
        .selectAll('line')
        .data(yScale.ticks(intervals))
        .join('line')
        .attr('y1', (d) => 0.5 + yScale(d))
        .attr('y2', (d) => 0.5 + yScale(d))
        .attr('x1', 0)
        .attr('x2', width)
    );

  // Rule
  const rule = svg
    .append('g')
    .append('line')
    .attr('y1', height)
    .attr('y2', 0)
    .attr('stroke', 'currentColor')
    .attr('stroke-opacity', 0.1);

  // Tooltip
  const callout = (g, value) => {
    if (!value) return g.style('display', 'none');

    g.style('display', null)
      .style('pointer-events', 'none')
      .style('font', '10px sans-serif');

    const path = g
      .selectAll('path')
      .data([null])
      .join('path')
      .attr('fill', 'white')
      .attr('stroke', 'black');

    const text = g
      .selectAll('text')
      .data([null])
      .join('text')
      .call((t) =>
        t
          .selectAll('tspan')
          .data(`${value}`.split(/\n/))
          .join('tspan')
          .attr('x', 0)
          .attr('y', (d, i) => `${i * 1.1}em`)
          .style('font-weight', (_, i) => (i ? null : 'bold'))
          .text((d) => d)
      );

    const { y, width: w, height: h } = text.node().getBBox();

    text.attr('transform', `translate(${-w / 2},${15 - y})`);
    path.attr(
      'd',
      `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
    );
  };

  const bsect = d3.bisector((d) => d.date).left;
  const bisect = (mx) => {
    const date = xScale.invert(mx);
    const index = bsect(data, date, 1);
    const a = data[index - 1];
    const b = data[index];
    return b && date - a.date > b.date - date ? b : a;
  };

  const formatValue = (value) => `${value} min`;
  const formatDate = (date) =>
    new Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: timezone,
    }).format(date);
  const tooltip = svg.append('g');

  svg.on('touchmove mousemove', function (event) {
    const { date, value } = bisect(d3.pointer(event, this)[0]);
    rule.attr('transform', `translate(${xScale(date) + 0.5},0)`);
    tooltip
      .attr('transform', `translate(${xScale(date)},${yScale(value)})`)
      .call(
        callout,
        `${formatValue(value)}
${formatDate(date)}`
      );
  });

  svg.on('touchend mouseleave', () => tooltip.call(callout, null));

  const line = d3
    .line()
    .curve(d3.curveBasisOpen)
    .defined((d) => !Number.isNaN(d.value))
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

  const area = d3
    .area()
    .curve(d3.curveBasisOpen)
    .defined((d) => !Number.isNaN(d.value))
    .x((d) => xScale(d.date))
    .y0(yScale(0))
    .y1((d) => yScale(d.value));
  svg
    .append('path')
    .datum(data)
    .attr('fill', '#8b5cf6')
    .attr('fill-opacity', '0.25')
    .attr('d', area);

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#8b5cf6')
    .attr('stroke-width', 1.5)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line);

  return <svg ref={svgRef} />;
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  selectedDateOption: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
};

export default LineChart;
