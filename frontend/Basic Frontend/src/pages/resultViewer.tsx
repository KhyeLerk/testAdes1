import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage } from '@ionic/react';
import './resultViewer.css';
import axios from 'axios';
import TableRow from '../components/resultViewer';

const getBasicResults = (festivalId: number) => {
  //get filtered table data per page 
  return axios.get('https://jibaboom-astronomia.herokuapp.com/basic/result', {
    params: {
      festivalId: festivalId
    }
  }).then(response => {
    return response.data;
  }).catch(error => {
    return [{ "performanceId": "festivalId not found! Please enter a valid festivalId"}];
  });
};
const ResultViewer: React.FC = () => {

  const [festivalId, setFestivalId] = useState<number>(0);
  const [festivalIdStr, setFestivalIdStr] = useState<String>("");

  const [dataRow, setDataRow] = React.useState([]);
  const [pressed, setPressed] = useState<number>(0);
  var timeArr= new Array();
  var i = 0;
  var j = 0;

  function festivalIdString(fes : number){
    setFestivalIdStr(fes.toString())

  }

  function getResults(festivalId: number) {
    getBasicResults(festivalId).then(data => { setDataRow(data) })
    setPressed(1);

    festivalIdString(festivalId);
  }

  function hide(){
    if(pressed ===1){
      return "hidden"
    }
    else return ""

  }

  function hide1(){
    console.log(pressed)
    if(pressed ===1){
      return ""
    }
    else return "hidden"

  }


  return (
    <IonPage>
      <IonContent>
        <div id="center" className={hide()}>
          <h1 id="mainText">Enter festivalId below</h1>
          <IonInput id="mainInput" type="number" min="0" value={festivalId} placeholder="Enter festivalId" onIonChange={e => { setFestivalId(parseInt(e.detail.value!, 10)) }} />
          <IonButton onClick={() => { getResults(festivalId) }} id="search">Search </IonButton>
        </div>

        <div id="afterSearch" className={hide1()}>
          <h1 id="leftMain">festivalId : {festivalIdStr}</h1>
          <IonInput id="rightInput" type="number" min="0" value={festivalId} placeholder="Enter festivalId" onIonChange={e => { setFestivalId(parseInt(e.detail.value!, 10)) }} />
          <IonButton onClick={() => { getResults(festivalId) }} id="searchRight">Search </IonButton>
        </div>

        <table>
          {dataRow.map(item => {
            timeArr[j] = [<td key={item['startTime']}>{item['startTime']}-{item['endTime']}</td>]
            j++
            return true;

          })

          }
          <tbody>
          <tr>
            <td className={pressed === 1? "ShowRow": "HideRow"}></td>
          {
            timeArr
          }
          </tr>

          {dataRow.map(item => {
            i++
            for(var j = 0; j < timeArr.length; j++){
            }
            return (
              <TableRow key={item['performanceId']} i={i} performanceId={item['performanceId']} timeArr= {timeArr}/>

            );
          })}
          </tbody>
        </table>
      </IonContent>
    </IonPage>
  );
};

export default ResultViewer;
