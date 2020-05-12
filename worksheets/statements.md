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
INSERT INTO performances(festivalId, startTime, endTime, performanceId) VALUES (1111111111, 12:00:00, 13:00:00, 1);
```

## SELECT all performances filter using festivalId
```sql
SELECT * FROM performances WHERE festivalId=1; 
```
