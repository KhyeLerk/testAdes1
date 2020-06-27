const { search } = require("../controller/app")

function advancedCompute(performances){

var performances= performances
var timeCumPop = []

var i = 1
var j = 0

/* Change to assigning all popularity values into timeCumPop */

for(u =0;u<performances.length;u++){
    timeCumPop[u] = performances[u][3]
}

/* Trying to do using 2d array */
do{
    do{
        if(performances[i][1] >= performances[j][2]){
            if(timeCumPop[i] < timeCumPop[j]+performances[i][3]){
                timeCumPop[i] = timeCumPop[j]+performances[i][3]
            }
        }
        j++
    }while(i != j )
i++
j=0
}while(i < performances.length)

/* Try to find the array index with the highest value */

var index = 0
var aryValue = timeCumPop[0]
i = 1
do{
    if(timeCumPop[i] > aryValue){
        index = i
        aryValue = timeCumPop[i]
    }
    i++
}while(i< timeCumPop.length)

/* Trying to find the path on which of the one gives the highest popularity */

i=0
var possiblePerformances = []

do{
    if(performances[index][1] >= performances[i][2]){
        possiblePerformances.push(performances[i][0])
    }
    i++
}while(i<index)

possiblePerformances.push(performances[index][0])

// Return if there is only one possible performances
if(possiblePerformances.length <=1) return performance[searchIndex(possiblePerformances[0])]

/* Trying to find the actual performances that were responsible for the max popularity */

function searchIndex(possiblePerformance){
    for(u = 0; u< performances.length;u++){
    if(performances[u][0] == possiblePerformance)
        return u;
    }
}

var enrolledPerformances = []
i =0
console.log("All possiblePerformances: "+possiblePerformances)
console.log(performances)
do{
    console.log(i)
    // console.log(possiblePerformances[i])
    // console.log(searchIndex(possiblePerformances[i]))
    if(i == (possiblePerformances.length-1)){
        enrolledPerformances.push(performances[searchIndex(possiblePerformances[i])])
        // if(performances[searchIndex(possiblePerformances[i])][2] <= performances[searchIndex(enrolledPerformances[0][0])][1]){
        //     enrolledPerformances.push(performances[i])
        // } 
    }

    else if(performances[searchIndex(possiblePerformances[i])][2] > performances[searchIndex(possiblePerformances[i+1])][1]){
        if(performances[searchIndex(possiblePerformances[i])][3] > performances[searchIndex(possiblePerformances[i+1])][3]) {
            enrolledPerformances.push(performances[i]);
            i++
        }
    }else{
        enrolledPerformances.push(performances[i])
        console.log(enrolledPerformances)
    }
    i++


}while(i < possiblePerformances.length)

return enrolledPerformances // return the results here

}

exports.advancedCompute = advancedCompute