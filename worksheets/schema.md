# Schema

This document will gives user a good idea of how your database's structure looks like.

You may refer to the following link to learn more about postgresql schema:

1. [CREATE statements](https://www.postgresqltutorial.com/postgresql-create-table/)
2. [Foreign Keys](https://www.postgresqltutorial.com/postgresql-foreign-key/)

The following are examples of how you can create a table, replace the examples with your own create statements of all your table.
```sql
CREATE TABLE table_name(
   id SERIAL PRIMARY KEY,
   name VARCHAR UNIQUE NOT NULL,
);

CREATE TABLE table_name_2(
   id SERIAL PRIMARY KEY,
   table_name_id VARCHAR NOT NULL REFERENCES table_name(id)
);
```






```sql
CREATE TABLE `ades_test`.`performance` (
  `performanceId` INT(10) NOT NULL AUTO_INCREMENT,
  `festivalId` INT(10) NOT NULL,
  `startTime` TIME NOT NULL,
  `endTime` TIME NOT NULL,
  PRIMARY KEY (`performanceId`),
  UNIQUE INDEX `performanceId_UNIQUE` (`performanceId` ASC) VISIBLE);
  
  CREATE TABLE `ades_test`.`performancewithpopularity` (
  `performanceId` INT(10) NOT NULL,
  `popularity` INT NULL,
  PRIMARY KEY (`performanceId`),
  UNIQUE INDEX `performanceId_UNIQUE` (`performanceId` ASC) VISIBLE,
  CONSTRAINT `performanceId`
    FOREIGN KEY (`performanceId`)
    REFERENCES `ades_test`.`performance` (`performanceId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```
