```sql
-- For Basic
CREATE TABLE `heroku_118371db0cc36c4`.`performance` (
  `performanceId` BIGINT() NOT NULL,
  `festivalId` BIGINT() NOT NULL,
  `startTime` VARCHAR(255) NOT NULL,
  `endTime` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`performanceId`),
  UNIQUE INDEX `performanceId_UNIQUE` (`performanceId` ASC));
  
-- For Advanced
CREATE TABLE `heroku_118371db0cc36c4`.`performancewithpopularity` (
  `performanceId` BIGINT() NOT NULL,
  `festivalId` BIGINT() NOT NULL,
  `startTime` VARCHAR(255) NOT NULL,
  `endTime` VARCHAR(255) NOT NULL,
  `popularity` BIGINT() NOT NULL,
  PRIMARY KEY (`performanceId`),
  UNIQUE INDEX `performanceId_UNIQUE` (`performanceId` ASC));
```
