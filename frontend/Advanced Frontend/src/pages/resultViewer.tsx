import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage } from '@ionic/react';
import './resultViewer.css';
import axios from 'axios';
import TableRow from '../components/resultViewer';
import MediaQuery from 'react-responsive';
import TableRowM from '../components/resultViewerMobile';

const getBasicResults = (festivalId: number) => {
  //get filtered table data per page 
  return axios.get('https://jibaboom-astronomia.herokuapp.com/advance/result', {
    params: {
      festivalId: festivalId
    }
  }).then(response => {
    return response.data;
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

  var totalPopularity = 0;

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
    if (pressed === 1) {
      return "hidden"
    }
    else return ""

  }

  function hide1() {
    if (pressed === 1) {
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
          <IonButton onClick={() => { getResults(festivalId) }} id="searchFirst">Search </IonButton>
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
            {dataRow.reverse().map(item => {
              timeArr[j] = [<td key={item['startTime']}>{item['startTime']}-{item['endTime']}</td>]
              timeArrM[j] = [<td key={item['startTime']}><p>{item['startTime']}</p><p>{item['endTime']}</p></td>]

              totalPopularity = totalPopularity + parseInt(item['popularity'])
              j++
              return true;

            })

            }
            <tbody>
              <tr>
                <td className={pressed === 1 ? "ShowRow" : "HideRow"}></td>
                {
                  timeArr
                }
              </tr>

              {dataRow.map(item => {
                i++
                for (var j = 0; j < timeArr.length; j++) {
                }
                return (
                  <TableRow key={item['performanceId']} i={i} performanceId={item['performanceId']} popularity={item['popularity']} timeArr={timeArr} />

                );
              })}
              <td className={pressed === 1 && !Number.isNaN(totalPopularity) ? "ShowRow" : "HideRow"}>Total popularity: {totalPopularity}</td>
            </tbody>
          </table>
        </MediaQuery>

        <MediaQuery maxDeviceWidth={600}>
          <table className='M'>
            <tbody>
              <tr>
              <td className={pressed === 1 ? "ShowRow M" : "HideRow"}>
                  
                  <p>Time</p>
                </td>
                <td className={pressed === 1 ? "ShowRow M" : "HideRow"}>
                  <p>performanceId</p>
                </td>
              </tr>
            
              {dataRow.map(item => {
                k++
                return (
                  <TableRowM key={item['performanceId']} i={k} popularity={item['popularity']} performanceId={item['performanceId']} timeArr={timeArrM} />

                );
              })}
            </tbody>
            <td className={pressed === 1 && !Number.isNaN(totalPopularity) ? "ShowRow" : "HideRow"}><p className="blue">Total popularity: {totalPopularity}</p></td>
            <td className={hide1()}></td>
          </table>
        </MediaQuery>

      </IonContent>
    </IonPage>
  );
};

export default ResultViewer;
