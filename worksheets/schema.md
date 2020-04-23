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
