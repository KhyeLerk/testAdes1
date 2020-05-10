```sql
CREATE TABLE `heroku_118371db0cc36c4`.`performance` (
  `performanceId` INT(10) NOT NULL,
  `festivalId` INT(10) NOT NULL,
  `startTime` TIME NOT NULL,
  `endTime` TIME NOT NULL,
  PRIMARY KEY (`performanceId`),
  UNIQUE INDEX `performanceId_UNIQUE` (`performanceId` ASC));

CREATE TABLE `heroku_118371db0cc36c4`.`performancewithid` (
  `performanceId` INT(10) NOT NULL,
  `popularity` INT NULL,
  PRIMARY KEY (`performanceId`),
  UNIQUE INDEX `performanceId_UNIQUE` (`performanceId` ASC),
  CONSTRAINT `performanceId`
    FOREIGN KEY (`performanceId`)
    REFERENCES `heroku_118371db0cc36c4`.`performance` (`performanceId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

```
