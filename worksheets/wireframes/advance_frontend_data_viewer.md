# Wireframe & Justification

This document should help you explain how your user interfaces are designed. You should have a wireframe to give a good overview and some screenshot with simple writeups to justify your designs.

## Wireframe

> This is just an example, please find your own wireframe.

![Wireframe](assets/sample-wireframe-data-viewer-frontend.png)

## Justifications

### Justification 1

![Photo1](https://github.com/ADES-FSP/jibaboom-2b22-astronomia/blob/master/worksheets/wireframes/assets/advance_front_end_data_viewer_1.png)

#### Good Points

1. Comes with entries limit to allow user to control the page size easily
2. Shows the number of entries in the database for ease of reference of the user
3. Able to filter in the column data with the arrow filter button at the end of each column header
4. Search bar included for fast retrieval of desired data
5. Pagination is clear and use of blue color as background properly highlights currently being displayed page

#### Bad Points

1. Need more than 1 search bar as we need to search by multiple attributes
2. Filtering order priority for each column is not clear, if quantity is the main filter property, and name being secondary, there is no clear indication of which one goes first
3. Up and down arrows of filtering is small and might be hard to click by the users
4. Search bar does not include a search button

### Justification 2

![Photo2](https://github.com/ADES-FSP/jibaboom-2b22-astronomia/blob/master/worksheets/wireframes/assets/advance_front_end_data_viewer_2.png)

#### Good Points

1. Interactable rows in the table allows hiding of less important datas from being displayed
2. Row highlighthing upon hovering allow user to clearly understand data to be focused
3. Darker background color of the header allows clear indication of table header

#### Bad Points

1. Lack of filter button
2. Lack of search button and input 
3. No pagination included, all data in the database will be displayed in a long scrolling page, wasting a lot of bandwidth to retrieve datas from the database

### Justification 3

![Photo2](https://github.com/ADES-FSP/jibaboom-2b22-astronomia/blob/master/worksheets/wireframes/assets/advance_front_end_data_viewer_3.png)

#### Good Points

1. Able to filter in the column data with the arrow filter button at the end of each column header
2. Comes with a side navigation bar for quick navigation between pages of the application
3. Kebab menu is clear and visible which can allow hiding of less important data in it to avoid overfitting the whole page with less important information

#### Bad Points

1. Header is slightly hard to tell due to lack of color contrast of the background and the weight of the font being same as the table contents
2. Lack of search button and input 
3. No pagination included, all data in the database will be displayed in a long scrolling page, wasting a lot of bandwidth to retrieve datas from the database
