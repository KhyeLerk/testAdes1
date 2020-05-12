import React, { useState } from 'react';
import { IonContent, IonButton, IonSearchbar, IonHeader, IonLabel, IonInput, IonFooter, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import TableRow from '../components/dataViewerContent';
import './dataViewer.css';
import axios from 'axios';
import { type } from 'os';


const getDataTable = (pages: number) => {
  //get table data per page
  return axios({
    url: `http://localhost:3000/api/performances/${pages}`,
    method: 'get'
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.log("error");
    alert(error)
  });
};

const getDataTableFestivalId = (pages: number, festivalId: string) => {
  //get filtered table data per page 
  return axios({
    url: `http://localhost:3000/api/performances/${pages}/${festivalId}/festivalId`,
    method: 'get'
  }).then(response => {
    if (response.data.length != 0)
      return response.data;
    else {
      return [{ "performanceId": "NO RESULTS FOUND", "festivalId": "NO RESULTS FOUND", "startTime": "NO RESULTS FOUND", "endTime": "NO RESULTS FOUND" }]
    }
  })
};


const getDataTableStartTime = (pages: number, startTime: string) => {
  //get filtered table data per page 
  return axios({
    url: `http://localhost:3000/api/performances/${pages}/${startTime}/startTime`,
    method: 'get'
  }).then(response => {
    if (response.data.length != 0)
      return response.data;
    else {
      return [{ "performanceId": "NO RESULTS FOUND", "festivalId": "NO RESULTS FOUND", "startTime": "NO RESULTS FOUND", "endTime": "NO RESULTS FOUND" }]
    }
  })
};

const getAllData = () => {
  //get number of data
  return axios({
    url: `http://localhost:3000/api/performances/`,
    method: 'get'
  }).then(response => {
    console.log(response.data[0].count)
    return response.data[0].count;
  })
};

const DataViewer: React.FC = () => {

  //Data binding
  const [festivalId, setFestivalId] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [dataRow, setDataRow] = React.useState([]);
  const [dataRowFId, setDataRowFId] = React.useState([]);
  const [dataRowSTime, setDataRowSTime] = React.useState([]);
  const [totalData, setTotalData] = React.useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState('');

  const totalPages = Math.ceil(totalData! / 10);

  //gets response data then stores in dataRow array
  React.useEffect(() => {

    getDataTable(1).then(data => setDataRow(data));

  }, []);


  //gets response data then stores in dataRow array
  React.useEffect(() => {
    getDataTableFestivalId(1, festivalId).then(data => setDataRowFId(data));
  }, [festivalId]);

  //gets response data then stores in dataRow array
  React.useEffect(() => {
    getDataTableStartTime(1, startTime).then(data => setDataRowSTime(data));
  }, [startTime]);

  //gets response data then stores in dataRow array
  React.useEffect(() => {
    getAllData().then(data => setTotalData(data));
  });

  //change page function
  function changePage(pageNo: number) {

    if (!(pageNo > totalPages) && !(pageNo < 1)) {
      getDataTable(pageNo).then(data => setDataRow(data))
      setCurrentPage(pageNo);
    }

  }

  //function to dynamically create pagination buttons based on data length
  function getPagination() {
    let arrayOfPages: number[] = []
    for (var i = 1; i <= totalPages; i++) {
      arrayOfPages.push(i)
    }
    return (
      arrayOfPages.map((pageNo) => (
        <a key={pageNo} onClick={() => changePage(pageNo)}>{pageNo}</a>
      )
      )
    )
  }

  //Get current entry in data table
  function getCurrentEntries() {
    var noOfEntries = dataRow.length;
    var startingEntry = currentPage;

    if (startingEntry! > 9) {
      startingEntry = startingEntry! * 10 + 1
    } else {
      startingEntry = (startingEntry! - 1) * 10 + 1;
    }
    var endingEntry = startingEntry! + noOfEntries - 1;
    return startingEntry + "-" + endingEntry;
  }

  return (
    <IonPage>
      <IonContent>
        <IonToolbar id="filter">
          <IonInput type="number" min="0" value={festivalId} placeholder="Filter festivalId" onIonChange={e => setFestivalId(e.detail.value!)} className="input"></IonInput>
          <IonInput type="number" min="0" value={startTime} placeholder="Filter startTime" onIonChange={e => setStartTime(e.detail.value!)} className="input"></IonInput>
        </IonToolbar>
        <div>
          <table id="row" color="dark">
            <thead>
              <tr>
                <th>festivalId</th>
                <th>performanceId</th>
                <th>startTime</th>
                <th>endTime</th>
              </tr>
            </thead>
            <tbody>
              {festivalId =="" && startTime ==""?
                dataRow.map(item => {
                  return (
                    <TableRow key={item['performanceId']} festivalId={item['festivalId']} performanceId={item['performanceId']} startTime={item['startTime']} endTime={item['endTime']} />
                  );
                })
                :startTime == ""?
                dataRowFId.map(item => {
                  return (
                    <TableRow key={item['performanceId']} festivalId={item['festivalId']} performanceId={item['performanceId']} startTime={item['startTime']} endTime={item['endTime']} />
                  );
                })
                :
                dataRowSTime.map(item => {
                  return (
                    <TableRow key={item['performanceId']} festivalId={item['festivalId']} performanceId={item['performanceId']} startTime={item['startTime']} endTime={item['endTime']} />
                  );
                })
              }


            </tbody>
          </table>

        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonLabel id="tableSize">Showing {getCurrentEntries()} of {totalData} entries</IonLabel>

          <div className="pagination">
            <a onClick={() => changePage(1)}>&laquo;&laquo;</a>
            <a onClick={() => changePage(currentPage - 1)}>&laquo;</a>
            {/* <a className="active" href="#">1</a> */}
            {getPagination()}

            <a onClick={() => changePage(currentPage + 1)}>&raquo;</a>
            <a onClick={() => changePage(totalPages)}>&raquo;&raquo;</a>

          </div>

        </IonToolbar>
      </IonFooter>
    </IonPage >
  );
};

export default DataViewer;
