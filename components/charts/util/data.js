import { bisector } from 'd3-array';

const getX = (d) => d.date;
const getY = (d) => d.value;
const getStatus = (d) => d.status;
const bisectDate = bisector((d) => new Date(d.date)).left;

export { getX, getY, getStatus, bisectDate };
