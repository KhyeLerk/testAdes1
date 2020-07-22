import React from 'react';
import './dataViewerContent.css';

interface ContainerProps {
  performanceId: string;
  i: number;
  timeArr: string[];
  popularity: string;

}


const TableRow: React.FC<ContainerProps> = ({ performanceId, i, timeArr,popularity }) => {
  return (
    <tr>

      {timeArr[i]}

      <td key={performanceId}><p id="mPer">{performanceId}({popularity})</p></td>

    </tr>
  );
};

export default TableRow;
