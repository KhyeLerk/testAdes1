import React, { useState } from 'react';
import { IonContent, IonButton, IonHeader, IonLabel, IonInput, IonFooter, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import TableRow from '../components/dataViewerContent';
import './dataViewer.css';
import axios from 'axios';


const getDataTable = (pages: number) => {
  //get table data per page
  return axios({
    url: `http://localhost:3000/api/performances/${pages}`,
    method: 'get'
  }).then(response => {
    console.log(response);
    return response.data;
  }).catch(error => {
    console.log("error");
    alert(error)
  });
};

const getAllData = () => {
  //get table data per page
  return axios({
    url: `http://localhost:3000/api/performances/`,
    method: 'get'
  }).then(response => {
    return response.data.length;
  })
};

const DataViewer: React.FC = () => {

  //Data binding
  const [festivalId, setFestivalId] = useState<number>();
  const [startTime, setStartTime] = useState<number>();
  const [dataRow, setDataRow] = React.useState([]);
  const [totalData, setTotalData] = React.useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalData! / 10);

  //gets response data then stores in dataRow array
  React.useEffect(() => {

    getDataTable(1).then(data => setDataRow(data));

  }, []);

  //gets response data then stores in dataRow array
  React.useEffect(() => {

    getAllData().then(data => setTotalData(data));

  });

  //change page function
  function changePage(pageNo:number){

    if(!(pageNo > totalPages) && !(pageNo < 1) ){
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


  function getCurrentEntries(){
       var noOfEntries = dataRow.length;
       var startingEntry = currentPage;
    
      if(startingEntry! > 9){
        startingEntry = startingEntry!*10+1
      }else{
        startingEntry = (startingEntry!-1)*10 + 1;
      }
      var endingEntry = startingEntry!+ noOfEntries -1;
      return startingEntry + "-" +  endingEntry;
  }


  return (
    <IonPage>
      <IonContent>
        <IonToolbar id="filter">
          <IonInput type="number" value={festivalId} onIonChange={e => setFestivalId(parseInt(e.detail.value!, 10))} placeholder="festivalId" inputMode="numeric" className="input"></IonInput>
          <IonInput type="number" value={startTime} onIonChange={e => setStartTime(parseInt(e.detail.value!, 10))} placeholder="startTime" inputMode="search" className="input"></IonInput>
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
              {
                dataRow.map(item => {
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
          <IonInput type="number" value={startTime} onIonChange={e => setStartTime(parseInt(e.detail.value!, 10))} placeholder="startTime" inputMode="search" className="input"></IonInput>

          <div className="pagination">
            <a onClick={() => changePage(1)}>&laquo;&laquo;</a>
            <a onClick={() => changePage(currentPage -1)}>&laquo;</a>
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
