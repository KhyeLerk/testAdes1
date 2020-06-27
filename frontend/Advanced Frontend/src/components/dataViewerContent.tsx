import React from 'react';
import './dataViewerContent.css';

interface ContainerProps {
  festivalId: string;
  performanceId: string;
  startTime: string;
  endTime: string;
  className: string;
  popularity: string;
}

const TableRow: React.FC<ContainerProps> = ({ festivalId , performanceId, startTime, endTime,className, popularity }) => {
  return (
    <tr>
      <td className={className}>{festivalId}</td>
      <td>{performanceId}</td>
      <td>{startTime}</td>
      <td>{endTime}</td>
      <td>{popularity}</td>

    </tr>
  );
};

export default TableRow;
