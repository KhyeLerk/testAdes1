import React, { useState } from 'react';
import { IonContent, IonButton, IonLabel, IonInput, IonFooter, IonPage, IonToolbar } from '@ionic/react';
import TableRow from '../components/dataViewerContent';
import './dataViewer.css';
import axios from 'axios';


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

const getDataTableFestivalId = (pages: number, festivalId: number, startTime: number) => {
  //get filtered table data per page 
  return axios({
    url: `http://localhost:3000/api/performances/${pages}/${startTime}/startTime/${festivalId}/festivalId`,
    method: 'get'
  }).then(response => {
    if (response.data.length !== 0)
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
  const [festivalIdNum, setFestivalIdNum] = useState<number>(0);
  const [startTimeNum, setStartTimeNum] = useState<number>(0);
  const [dataRow, setDataRow] = React.useState([]);
  const [totalData, setTotalData] = React.useState<number>();
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [totalDataFiltered, setTotaltotalDataFiltered] = React.useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(totalData! / 10);

  //gets response data then stores in dataRow array
  React.useEffect(() => {
    getDataTable(1).then(data => setDataRow(data));
  }, []);


  //gets filtered response data then stores in dataRow array
  function showFilteredRows() {
    getDataTableFestivalId(1, festivalIdNum, startTimeNum).then(data => { setDataRow(data); console.log(data) })

  }

  //checks for changes in filter input
  React.useEffect(() => {
    if (Number.isNaN(startTimeNum)) {
      setStartTimeNum(0);
    }
    if (Number.isNaN(festivalIdNum)) {
      setFestivalIdNum(0);
    }
  }, [startTimeNum, festivalIdNum]);


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
        <button key={pageNo} onClick={() => changePage(pageNo)}>{pageNo}</button>
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
          <IonLabel>festivalId:</IonLabel>
          <IonInput type="number" min="0" value={festivalId} placeholder="Filter festivalId" onIonChange={e => { setFestivalIdNum(parseInt(e.detail.value!, 10)); setFestivalId(e.detail.value!) }} className="input"></IonInput>
          <IonLabel>startTime:</IonLabel>
          <IonInput type="number" min="0" value={startTime} placeholder="Filter startTime" onIonChange={e => { setStartTimeNum(parseInt(e.detail.value!, 10)); setStartTime(e.detail.value!) }} className="input"></IonInput>
          <IonButton onClick={() => { showFilteredRows() }} id="search">Search </IonButton>
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
              {  dataRow.map(item => {
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

            <button onClick={() => changePage(1)}>&laquo;&laquo;</button>
            <button onClick={() => changePage(currentPage - 1)}>&laquo;</button>
            {/* <a className="active" href="#">1</a> */}
            {getPagination()}
            <button onClick={() => changePage(currentPage + 1)}>&raquo;</button>
            <button onClick={() => changePage(totalPages)}>&raquo;&raquo;</button>
          </div>
          <IonInput type="number" min="0" value={pageSize} onIonChange={e => { setPageSize(parseInt(e.detail.value!, 10))}} id="pageSize"></IonInput>

        </IonToolbar>
      </IonFooter>
    </IonPage >
  );
};

export default DataViewer;
