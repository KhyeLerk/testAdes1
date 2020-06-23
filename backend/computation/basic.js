function basicCompute(orderedPerformances){

var selectedList = [orderedPerformances[0]]
var i=1;

do{
    if(selectedList[selectedList.length-1][2] <= orderedPerformances[i][1]){
       selectedList.push(orderedPerformances[i]) 
    }
    i++
}while(i < orderedPerformances.length)

return selectedList
}