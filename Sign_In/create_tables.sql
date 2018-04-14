CREATE TABLE `UserBlockstackIDs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BlockstackID` varchar(255) NOT NULL,
  `cid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserBlockstackIDs_BlockstackID_uindex` (`BlockstackID`),
  KEY `UserBlockstackIDs_UserContacts_cid_fk` (`cid`),
  CONSTRAINT `UserBlockstackIDs_UserContacts_cid_fk` FOREIGN KEY (`cid`) REFERENCES `UserContacts` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `UserContacts` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Gender` char(1) DEFAULT NULL,
  `Birthday` datetime DEFAULT NULL,
  `Hometown` varchar(255) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `UserEmails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserEmails_Email_uindex` (`Email`),
  KEY `UserEmails_UserContacts_cid_fk` (`cid`),
  CONSTRAINT `UserEmails_UserContacts_cid_fk` FOREIGN KEY (`cid`) REFERENCES `UserContacts` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `UserFollowers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `ProfileID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserFollowers_UserContacts_cid_fk` (`cid`),
  KEY `UserFollowers_UserContacts_cid_fk_2` (`ProfileID`),
  CONSTRAINT `UserFollowers_UserContacts_cid_fk` FOREIGN KEY (`cid`) REFERENCES `UserContacts` (`cid`),
  CONSTRAINT `UserFollowers_UserContacts_cid_fk_2` FOREIGN KEY (`ProfileID`) REFERENCES `UserContacts` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `UserImages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `ResourceURI` varchar(512) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserImages_UserContacts_cid_fk` (`cid`),
  KEY `UserImages_UserPosts_id_fk` (`pid`),
  CONSTRAINT `UserImages_UserContacts_cid_fk` FOREIGN KEY (`cid`) REFERENCES `UserContacts` (`cid`),
  CONSTRAINT `UserImages_UserPosts_id_fk` FOREIGN KEY (`pid`) REFERENCES `UserPosts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `UserLoginTimes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `Login` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserLoginTimes_UserContacts_cid_fk` (`cid`),
  CONSTRAINT `UserLoginTimes_UserContacts_cid_fk` FOREIGN KEY (`cid`) REFERENCES `UserContacts` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `UserPosts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `ResourceURI` varchar(512) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserPosts_UserContacts_cid_fk` (`cid`),
  CONSTRAINT `UserPosts_UserContacts_cid_fk` FOREIGN KEY (`cid`) REFERENCES `UserContacts` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

#######################################
######
###### DDL From DataGrip
######
#######################################

create table UserBlockstackIDs
(
	id int auto_increment
		primary key,
	BlockstackID varchar(255) not null,
	cid int not null,
	constraint UserBlockstackIDs_BlockstackID_uindex
		unique (BlockstackID)
)
engine=InnoDB
;

create index UserBlockstackIDs_UserContacts_cid_fk
	on UserBlockstackIDs (cid)
;

create table UserContacts
(
	cid int auto_increment
		primary key,
	Name varchar(255) null,
	Gender char null,
	Birthday datetime null,
	Hometown varchar(255) null,
	Title varchar(255) null
)
engine=InnoDB
;

alter table UserBlockstackIDs
	add constraint UserBlockstackIDs_UserContacts_cid_fk
		foreign key (cid) references UserContacts (cid)
;

create table UserEmails
(
	id int auto_increment
		primary key,
	cid int not null,
	Email varchar(255) not null,
	constraint UserEmails_Email_uindex
		unique (Email),
	constraint UserEmails_UserContacts_cid_fk
		foreign key (cid) references UserContacts (cid)
)
engine=InnoDB
;

create index UserEmails_UserContacts_cid_fk
	on UserEmails (cid)
;

create table UserFollowers
(
	id int auto_increment
		primary key,
	cid int not null,
	ProfileID int not null,
	constraint UserFollowers_UserContacts_cid_fk
		foreign key (cid) references UserContacts (cid),
	constraint UserFollowers_UserContacts_cid_fk_2
		foreign key (ProfileID) references UserContacts (cid)
)
engine=InnoDB
;

create index UserFollowers_UserContacts_cid_fk
	on UserFollowers (cid)
;

create index UserFollowers_UserContacts_cid_fk_2
	on UserFollowers (ProfileID)
;

create table UserImages
(
	id int auto_increment
		primary key,
	cid int not null,
	pid int not null,
	ResourceURI varchar(512) not null,
	constraint UserImages_UserContacts_cid_fk
		foreign key (cid) references UserContacts (cid)
)
engine=InnoDB
;

create index UserImages_UserContacts_cid_fk
	on UserImages (cid)
;

create index UserImages_UserPosts_id_fk
	on UserImages (pid)
;

create table UserLoginTimes
(
	id int auto_increment
		primary key,
	cid int not null,
	Login datetime not null,
	constraint UserLoginTimes_UserContacts_cid_fk
		foreign key (cid) references UserContacts (cid)
)
engine=InnoDB
;

create index UserLoginTimes_UserContacts_cid_fk
	on UserLoginTimes (cid)
;

create table UserPosts
(
	id int auto_increment
		primary key,
	cid int not null,
	ResourceURI varchar(512) not null,
	constraint UserPosts_UserContacts_cid_fk
		foreign key (cid) references UserContacts (cid)
)
engine=InnoDB
;

create index UserPosts_UserContacts_cid_fk
	on UserPosts (cid)
;

alter table UserImages
	add constraint UserImages_UserPosts_id_fk
		foreign key (pid) references UserPosts (id)
;

