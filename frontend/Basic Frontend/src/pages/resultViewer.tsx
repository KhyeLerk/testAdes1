import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage } from '@ionic/react';
import './resultViewer.css';
import axios from 'axios';
import TableRow from '../components/resultViewer';
import TableRowM from '../components/resultViewerMobile';

import MediaQuery from 'react-responsive';

const getBasicResults = (festivalId: number) => {
  //get filtered table data per page 
  return axios.get('https://jibaboom-astronomia.herokuapp.com/basic/result', {
    params: {
      festivalId: festivalId
    }
  }).then(response => {
    return response.data.result;
    
  }).catch(error => {
    return [{ "performanceId": "festivalId not found!" }];
  });
};
const ResultViewer: React.FC = () => {

  const [festivalId, setFestivalId] = useState<number>(0);
  const [festivalIdStr, setFestivalIdStr] = useState<String>("");

  const [dataRow, setDataRow] = React.useState([]);
  const [pressed, setPressed] = useState<number>(0);
  var timeArr = new Array();
  var timeArrM = new Array();

  var i = 0;
  var j = 0;
  var k = -1;

  function festivalIdString(fes: number) {
    setFestivalIdStr(fes.toString())

  }

  function getResults(festivalId: number) {
    getBasicResults(festivalId).then(data => { setDataRow(data) })
    setPressed(1);

    festivalIdString(festivalId);
  }

  function hide() {
    if (pressed === 1 && dataRow.length !== 0) {
      return "hidden"
    }
    else return ""

  }

  function hide1() {
    console.log(pressed)
    if (pressed === 1 && dataRow.length !== 0) {
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
          <IonButton onClick={() => { getResults(festivalId) }} id="searchRV">Search </IonButton>
        </div>

        <div id="afterSearch" className={hide1()}>
          <MediaQuery minDeviceWidth={600}>
            <h1 id="leftMain">festivalId : {festivalIdStr}</h1>
            <IonInput id="rightInput" type="number" min="0" value={festivalId} placeholder="Enter festivalId" onIonChange={e => { setFestivalId(parseInt(e.detail.value!, 10)) }} />
            <IonButton onClick={() => { getResults(festivalId) }} id="searchRight">Search </IonButton>
          </MediaQuery>

          <MediaQuery maxDeviceWidth={600}>
            <IonInput id="rightInput" type="number" min="0" value={festivalId} placeholder="Enter festivalId" onIonChange={e => { setFestivalId(parseInt(e.detail.value!, 10)) }} />
            <IonButton onClick={() => { getResults(festivalId) }} id="searchRight">Search </IonButton>
            <h1 id="leftMain">festivalId : {festivalIdStr}</h1>
          </MediaQuery>


        </div>

        <MediaQuery minDeviceWidth={600}>


        <table className="W">
          {dataRow.map(item => {
            timeArr[j] = [<td key={item['startTime']}>{item['startTime']}-{item['endTime']}</td>]
            timeArrM[j] = [<td key={item['startTime']}><p>{item['startTime']}</p><p>{item['endTime']}</p></td>]

            j++
            return true;
          })
          }
          
          <p className={pressed === 1 && dataRow.length ===0  ? "red" : "HideRow1 red"}>FestivalId not Found!</p>

          <tbody>
            <tr>
              <td className={pressed === 1 && dataRow.length !==0 ? "ShowRow" : "HideRow"}></td>
              {
                timeArr
              }
            </tr>

            {dataRow.map(item => {
              i++
              return (
                <TableRow key={item['performanceId']} i={i} performanceId={item['performanceId']} timeArr={timeArr} />

              );
            })}
          </tbody>
        </table>

        </MediaQuery>

        <MediaQuery maxDeviceWidth={600}>
          <table className='M'>
            <tbody>
            <p className={pressed === 1 && dataRow.length ===0  ? "red" : "HideRow1 red"}>FestivalId not Found!</p>

              <tr>
              <td className={pressed === 1  && dataRow.length !== 0? "ShowRow M" : "HideRow"}>
                  
                  <p>Time</p>
                </td>
                <td className={pressed === 1  && dataRow.length !== 0? "ShowRow M" : "HideRow"}>
                  <p>performanceId</p>
                </td>
              </tr>
            
              {dataRow.map(item => {
                k++
                return (
                  <TableRowM key={item['performanceId']} i={k} performanceId={item['performanceId']} timeArr={timeArrM} />

                );
              })}
            </tbody>
          </table>
        </MediaQuery>
      </IonContent>
    </IonPage>
  );
};

export default ResultViewer;
