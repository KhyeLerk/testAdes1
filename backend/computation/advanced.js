function advancedCompute(performances){

var performances= performances
var timeCumPop = []
var tracker = []

var i = 1
var j = 0

/* Change to assigning all popularity values into timeCumPop */

for(u =0;u<performances.length;u++){
    timeCumPop[u] = performances[u][3]
    tracker[u] = [performances[u]]
}

/* Trying to do using 3d array */
do{
    do{
        if(parseInt(performances[i][1]) >= parseInt(performances[j][2])){
            if(timeCumPop[i] < timeCumPop[j]+performances[i][3]){
                timeCumPop[i] = timeCumPop[j]+performances[i][3]
                tracker[i] = [performances[i]]
                for(var x=0;x < tracker[j].length;x++){
                    tracker[i].push(tracker[j][x])
                }
            }
        }
        j++
    }while(i != j )
i++
j=0
}while(i < performances.length)
console.log("================== Tracker begins here ==========================")
console.log(tracker)
console.log("=================== Tracker ends here ===========================")
console.log(timeCumPop)
console.log("================== Above is timeCumPop ==========================")

/* Try to find the array index with the highest value */

var index = timeCumPop.indexOf(Math.max(...timeCumPop))

return tracker[index] // return the results here

}

exports.advancedCompute = advancedCompute