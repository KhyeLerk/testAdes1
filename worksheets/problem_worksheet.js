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
