import React, { useState } from 'react';
import { IonContent, IonButton, IonLabel, IonInput, IonFooter, IonPage, IonToolbar } from '@ionic/react';
import TableRow from '../components/dataViewerContent';
import './dataViewer.css';
import axios from 'axios';
import { array } from 'prop-types';


const getDataTable = (pages: number, rows: number) => {
  //get table data per page
  return axios({
    url: `http://localhost:3000/api/performances/${pages}/${rows}`,
    method: 'get'
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.log("error");
    alert(error)
  });
};

const getDataTableFestivalId = (pages: number, festivalId: number, startTime: number, rows: number) => {
  //get filtered table data per page 
  return axios({
    url: `http://localhost:3000/api/performances/${pages}/${startTime}/startTime/${festivalId}/festivalId/${rows}`,
    method: 'get'
  }).then(response => {
    if (response.data.length !== 0)
      return response.data;
    else {
      return [{ "performanceId": "NO RESULTS FOUND", "festivalId": "NO RESULTS FOUND", "startTime": "NO RESULTS FOUND", "endTime": "NO RESULTS FOUND" }]
    }
  })
};
const getAllFilteredRows = (festivalId: number, startTime: number) => {
  //get filtered table data per page 
  return axios({
    url: `http://localhost:3000/api/performances/${startTime}/startTime/${festivalId}/festivalId/1`,
    method: 'get'
  }).then(response => {
    if (response.data.length !== 0) {
      console.log( response);
      return response.data[0].count;
    }
    else {
      return 0
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
  var [pageSize, setPageSize] = React.useState<number>(10);
  const [totalDataFiltered, setTotaltotalDataFiltered] = React.useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(totalData! / 10);
  const totalPagesFiltered = Math.ceil(totalDataFiltered! / 10);

  //gets response data then stores in dataRow array
  React.useEffect(() => {
    getDataTable(1, pageSize).then(data => setDataRow(data));
  }, [pageSize]);


  //gets filtered response data then stores in dataRow array
  function showFilteredRows() {
    getDataTableFestivalId(1, festivalIdNum, startTimeNum, pageSize).then(data => { setDataRow(data); console.log(data) })
    getAllFilteredRows(startTimeNum, festivalIdNum).then(data => setTotaltotalDataFiltered(data));

  }

  //checks for changes in filter input
  React.useEffect(() => {

    if (Number.isNaN(startTimeNum)) {
      setStartTimeNum(0);
    }
    if (Number.isNaN(festivalIdNum)) {
      setFestivalIdNum(0);
    }
    if(festivalIdNum==0 && startTimeNum==0){
      getDataTable(1, pageSize).then(data => setDataRow(data));
    }

    if (Number.isNaN(pageSize)) {
      setPageSize(10);
    }
  }, [startTimeNum, festivalIdNum, pageSize]);


  //gets response data then stores in dataRow array
  React.useEffect(() => {
    getAllData().then(data => setTotalData(data));
  });

  //gets response data then stores in dataRow array
  // React.useEffect(() => {
  //   getAllFilteredRows(startTimeNum, festivalIdNum).then(data => setTotaltotalDataFiltered(data));
  // }, [startTimeNum, festivalIdNum]);


  //change page function
  function changePage(pageNo: number, pageSize: number) {

    if (!(pageNo > totalPages) && !(pageNo < 1)) {
      getDataTable(pageNo, pageSize).then(data => setDataRow(data))
      setCurrentPage(pageNo);
    }

  }

  //function to dynamically create pagination buttons based on data length
  function getPagination() {
    let arrayOfPages: number[] = []
    // let arrayOfPages1: number[] = []
    // var start = 0;
    // var max = 2;
    for (var i = 1; i <= totalPages; i++) {
      arrayOfPages.push(i)
    }

    // if (totalPages > max ) {
    //   console.log(arrayOfPages)
    //   arrayOfPages1 = arrayOfPages.slice(start, max)
    //   console.log(arrayOfPages1)
    // }

    // if (currentPage === max && !(currentPage === totalPages)) {
    //   start++
    //   max++
    //   arrayOfPages1 = arrayOfPages.slice(start, max)
    // }
    // if(currentPage === totalPages){

    // }
    return (
      arrayOfPages.map((pageNo) => (
        <button key={pageNo} onClick={() => changePage(pageNo, pageSize)}>{pageNo}</button>
      )
      )

    )
  }

  function getAllEntries(){
    if(festivalIdNum==0 && startTimeNum == 0){
      return totalData
    }
    else{
      return totalDataFiltered
    }
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
          {/* <IonLabel>festivalId:</IonLabel> */}
          <IonInput type="number" min="0" value={festivalId} placeholder="Filter festivalId" onIonChange={e => { setFestivalIdNum(parseInt(e.detail.value!, 10)); setFestivalId(e.detail.value!) }} className="input"></IonInput>
          {/* <IonLabel>startTime:</IonLabel> */}
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
              {dataRow.map(item => {
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
          <IonLabel id="tableSize">Showing {getCurrentEntries()} of { getAllEntries()} entries</IonLabel>

          <div className="pagination">

            <button onClick={() => changePage(1, pageSize)}>&laquo;&laquo;</button>
            <button onClick={() => changePage(currentPage - 1, pageSize)}>&laquo;</button>
            {getPagination()}
            <button onClick={() => changePage(currentPage + 1, pageSize)}>&raquo;</button>
            <button onClick={() => changePage(totalPages, pageSize)}>&raquo;&raquo;</button>
          </div>
          <IonInput type="number" min="1" value={pageSize} onIonChange={e => { setPageSize(parseInt(e.detail.value!, 10)); console.log(pageSize) }} id="pageSize"></IonInput>
        </IonToolbar>
      </IonFooter>
    </IonPage >
  );
};

export default DataViewer;
