Basic

1) Get all the performances' start and end time
2) Arrange them such that their end time is in increasing order
3) Take the first act in the array
4) Check if the following act's start time in the array of the ordered performances have the same or greater value in terms of time in comparison to the previous act
5) If true, the act will be added into the selected list of performances array, pass if false
6) Continue step 4 and 5 until all ordered performances' array elements has been checked
7) Result will be the selected list of performances array

Advanced

1) Get all performances' start time, end time and popularity
3) Arrange them such that their end time is in increasing order
3) Create another array to store all the popularity for each of the performances that has been reordered
4) Check for the whole performances array starting from the 2nd element, if the previous element's end time is before or exactly the start time of the element
5) If true, the element's popularity will be added up to the two that has been compared
6) For the third element, check with the first and second element, fourth element will be checked with the first 3 elements and so on
7) Check the array of popularity, the performance with the highest cumulative popularity will be the final performance for the highest popularity choice combination of performance
8) Find the possible performances before this performance by checking whether if the start time of the final performance is greater than or equal to the end time of the performances before it
9) If true, the performance are included in a list of possible performance for highest popularity combination
10) Compare among all possible performance, if the end time of a performance is greater than the start time of the performance after it in the array, omit the one performance with lower popularity
11) Go through all the performances and the ideal performance to watch combination will be computed
