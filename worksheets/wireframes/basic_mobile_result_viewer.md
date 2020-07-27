
# Wireframe & Justification


## Wireframe
### Wireframe part 1
![Wireframe1](assets/result-viewer-mobile.png)
### Wireframe part 2
![Wireframe2](assets/basic-wireframe-result-viewer-mobile-2.png)

  For the mobile result viewer, the initial screen would be `Wireframe part 1` when the admin has not input any festivalId. This is to avoid unnecessary UI to make it easier for the admin to use. After entering in the festivalId the admin will be directed to `Wireframe part 2` where it shows the results of the festivalId. 
  
  The design of the result viewer in `Wireframe part 2` differs from the frontend wireframe as a timetable of that scale would be too large to properly fit in a mobile screen resolution while maintaining the readibility it should offer. Therefore having the time attribute as a column instead of a row would fix this problem and allows the admin to see the data result clearly. It also takes advantage of virtual scrolling which is easy to use on mobile.
  
  By having the search bar for festivalId at the top of the screen, it allows admins to search for other festivalIds without having to return to the previous page. This makes the result viewer more flexible and efficient to use.
# Justifications

### Justification 1

![Image1](assets/basic_mobile_result_1.jpg)

###### Good Points

- Input using + and - button omits the need of on screen keyboard which blocks some information on the screen
- Can see the results of computation very clearly

###### Bad Points

- Does not have sufficient space for more field input
- Thick header takes up too much space

### Justification 2

![Image2](assets/basic_mobile_result_2.jpg)

###### Good Points

- Showing results in horizontal bars allows the comparison between one another to be done clearly rather than plain numbers
- Convenient edit button at the side of each horizontal bars allow quick edit of input information
- Plus icon at the top allows addition of new rows of input to be entered for ease of use to avoid the need to scroll to the bottom of the interface to input values

###### Bad Points

- Computed results displayed on this interface might looked same size as the input bars, creating a confusion to users when they have clicked to compute the result
- Values embedded in the horizontal bars cannot be seen clearly when it is not fully filled or empty as the color of the bar are not in contrast with the color of the embedded text values
- The UI has no space to fit in a "compute" button to begin the compute result

### Justification 3

![Image3](assets/basic_mobile_result_3.jpg)

###### Good Points

- The semi-circle was able to attract the attention of the users, making it a good spot to display results which will be the main point of this UI
- The semi-circle can be broken down into a few parts making it possible to show the length of each performance for our problem
- Plus icon at the top allows addition of new rows of input to be entered for ease of use to avoid the need to scroll to the bottom of the interface to input values

###### Bad Points

- No space to fit in the edit button for values to be input
- No space for the compute button
- The big result viewer takes up a lot of space of the screen, reduces the space reserved for input

