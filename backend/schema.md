CREATE TABLE `Performance` (
  `performanceId` INT(10) NOT NULL AUTO_INCREMENT,
  `startTime` TIME NOT NULL,
  `endTime` TIME NOT NULL,
  PRIMARY KEY (`performanceID`),
  UNIQUE INDEX `performanceID_UNIQUE` (`performanceID` ASC) VISIBLE);
  
  CREATE TABLE `PerformanceWithPopularity` (
  `performanceId` INT(10) NOT NULL,
  `startTime` TIME NOT NULL,
  `endTime` TIME NOT NULL,
  `popularity` INT,
  PRIMARY KEY (`performanceId`),
  UNIQUE INDEX `performanceId_UNIQUE` (`performanceId` ASC) VISIBLE);
