# SQL Statements

For this worksheet you will need to provide an example of your own SQL statement. The two given are examples.

## INSERT

Example:
```sql
INSERT INTO table_name (attr1, attr2,...) VALUES (value1, value2, ...);
```

## SELECT with Filtering and Pagination

Example:
```sql
SELECT * FROM table_name WHERE attr1 == value1 AND attr2 >= value2 LIMIT 10 OFFSET 20;
```

## INSERT new performances
```sql
INSERT INTO performance(festivalId, startTime, endTime, performanceId)VALUES(2222222222,"1200","1400",1111111111);
```

## SELECT number of performances
```sql
SELECT * FROM performances WHERE festivalId=1; 
```
