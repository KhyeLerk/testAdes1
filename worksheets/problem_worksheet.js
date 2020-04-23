var performances = [[10,12],[12,13],[11,12],[12,14],[13,15]]

var orderedPerformances = [performances[0]] 
var selectedList;
var u;
var i;
for(i = 1;i<performances.length;i++){
    u=i
    orderedPerformances[u] = performances[u]

    do{     
    if(orderedPerformances[u][1] < orderedPerformances[u-1][1]){ 
        temp = orderedPerformances[u] 
        orderedPerformances[u] = orderedPerformances[u-1] 
        orderedPerformances[u-1] = temp
        u-=1;
        if(u<=0){
            u++;
        }
    }
    else { 
        break;
    }
    }while(orderedPerformances[u][1] < orderedPerformances[u-1][1]);
}

selectedList = [orderedPerformances[0]]
i=1;

do{
    if(selectedList[selectedList.length-1][1] <= orderedPerformances[i][0]){
       selectedList.push(orderedPerformances[i]) 
    }
    i++
}while(i < orderedPerformances.length) // i < 5

console.log(selectedList)

/*
================
Advanced portion
================
*/

// Assume arrangement is completed
var performancesId = []
var performances = [[1,4],[2,6],[4,7],[6,8],[5,9],[7,10]]
var profit = [3,5,2,6,4,8]
var timeCumProf = [];
var i = 1
var j = 0

// Assign arrayRef ID for performances first
for(u = 0;u < performances.length;u++){
    performancesId[u] = u
}
console.log(performancesId)

// Assign all values in profit to timeCumProf
for(u = 0;u < profit.length;u++){
    timeCumProf[u] = profit[u]
}

// Assigning correct values for timeCumProf
do{
    do{
        if(performances[i][0] >= performances[j][1]){
            if(timeCumProf[i] < profit[j]+profit[i]){
                timeCumProf[i] = profit[j]+profit[i]
            }
        }
        j++
    }while(i != j )
i++
j=0
}while(i < profit.length)

console.log(timeCumProf) // Values obtained were now correct

// Find the array index with the highest value

var index = 0
var aryValue = timeCumProf[0]
i =1
do{
    if(timeCumProf[i] > aryValue){
        index = i
        aryValue = timeCumProf[i]
    }
    i++
}while(i < timeCumProf.length)

console.log(index) // Values obtained were now correct, array index with the highest value

// Find the path on which of the one gives the highest popularity

i=0
var possibleActs = []

do{
    if(performances[index][0] >= performances[i][1]){
        possibleActs.push(performancesId[i])
    }
    i++
}while(i< index)

console.log(possibleActs)

// Finding the actual acts that were responsible for the max popularity

var enrolledActs = [performancesId[index]]
i=0

do{
    if(performances[possibleActs[i]][1] > performances[possibleActs[i]][0]){
        if(profit[i] > profit[i+1]) enrolledActs.push(performancesId[i])
    }
    else{
        enrolledActs.push(performancesId[i])
    }
    i++
}while(i < possibleActs.length)

console.log(enrolledActs)




