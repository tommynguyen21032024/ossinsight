import { Personal } from "../../hooks/usePersonal";
import React, { useMemo } from "react";
import Box from "@mui/material/Box";

interface TimeDistributionProps {
  title: string;
  size: number;
  gap: number;
  offset: number;
  data: Personal<'personal-contribution-time-distribution'>[];
}

const times = Array(24).fill(0).map((_, i) => i);
const days = Array(7).fill(0).map((_, i) => i);

const TimeDistribution = ({ title, size, gap, offset, data }: TimeDistributionProps) => {
  const max = useMemo(() => {
    return data.reduce((max, cur) => Math.max(max, cur.cnt), 0);
  }, [data]);

  const paddingTop = 20;

  const width = useMemo(() => {
    return size * 24 + gap * 23;
  }, [size, gap]);

  const height = useMemo(() => {
    return size * 7 + gap * 6 + 40 /* for legends */;
  }, [size, gap]);

  return (
    <Box sx={{ overflow: 'scroll', maxWidth: 'calc(100vw - 32px)' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height + paddingTop}
           viewBox={`0 -${paddingTop} ${width} ${height}`} display='block'>
        <g id="title">
          <text textAnchor="middle" x="50%" y={8 - paddingTop} fontSize={14} fill="#dadada" fontWeight="bold">
            {title}
          </text>
        </g>
        <g id="chart">
          {times.map(time => days.map(day =>
            <rect
              key={`${time}-${day}`}
              x={time * (size + gap)}
              y={day * (size + gap)}
              width={size}
              height={size}
              rx={3}
              ry={3}
              fill={getColor(0, 0)}
            />,
          ))}
          {data.map(({ dayofweek: day, cnt, hour: time, type }) => (
            <rect
              key={`${time}-${day}`}
              x={((24 + time + offset) % 24) * (size + gap)}
              y={day * (size + gap)}
              width={size}
              height={size}
              rx={3}
              ry={3}
              fill={getColor(cnt, max)}
            />
          ))}
        </g>
        <g id="legend">
          <text fontSize={12} fill="#dadada" x="0" y={height - 29} alignmentBaseline="text-before-edge">less</text>
          {contributeDistributionColors.map((color, i) => (
            <rect
              key={color}
              fill={color}
              x={36 + i * (size + 4)}
              y={height - 28}
              width={size}
              height={size}
              rx={3}
              ry={3}
            />
          ))}
          <text fontSize={12} fill="#dadada" x={48 + contributeDistributionColors.length * (size + 4)} y={height - 28} alignmentBaseline="text-before-edge">more</text>
        </g>
      </svg>
    </Box>
  );
};

const contributeDistributionColors = ['#2C2C2C', '#00480D', '#017420', '#34A352', '#6CDE8C', '#B5FFC9'];

const getColor = (num: number, max: number) => {
  const d = num / max;
  if (num === 0) {
    return contributeDistributionColors[0];
  } else if (d < 1 / 5) {
    return contributeDistributionColors[1];
  } else if (d < 2 / 5) {
    return contributeDistributionColors[2];
  } else if (d < 3 / 5) {
    return contributeDistributionColors[3];
  } else if (d < 4 / 5) {
    return contributeDistributionColors[4];
  } else {
    return contributeDistributionColors[5];
  }
};

export default TimeDistribution