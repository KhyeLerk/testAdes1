```sql
CREATE TABLE `heroku_118371db0cc36c4`.`performance` (
  `performanceId` INT(10) NOT NULL,
  `festivalId` INT(10) NOT NULL,
  `startTime` VARCHAR(4) NOT NULL,
  `endTime` VARCHAR(4) NULL,
  `popularity` INT NULL,
  PRIMARY KEY (`performanceId`),
  UNIQUE INDEX `performanceId_UNIQUE` (`performanceId` ASC));
```
