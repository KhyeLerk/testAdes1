import React from 'react';
import './dataViewerContent.css';

interface ContainerProps {
  festivalId: string;
  performanceId: string;
  startTime: string;
  endTime: string;
}

const TableRow: React.FC<ContainerProps> = ({ festivalId , performanceId, startTime, endTime }) => {
  return (
    <tr>
      <td>{festivalId}</td>
      <td>{performanceId}</td>
      <td>{startTime}</td>
      <td>{endTime}</td>
    </tr>
  );
};

export default TableRow;
