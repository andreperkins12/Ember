create table UserBlockstackIDs
(
	id int auto_increment
		primary key,
	BlockstackID varchar(255) not null,
	cid int not null,
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
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
	Title varchar(255) null,
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
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
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
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
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
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
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
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
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
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
	Content varchar(512) not null,
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
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

