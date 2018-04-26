CREATE TABLE ember.UserBlockstackIDs
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    BlockstackID varchar(255) NOT NULL,
    cid int(11) NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT UserBlockstackIDs_UserContacts_cid_fk FOREIGN KEY (cid) REFERENCES UserContacts (cid)
);
CREATE UNIQUE INDEX UserBlockstackIDs_BlockstackID_uindex ON ember.UserBlockstackIDs (BlockstackID);
CREATE INDEX UserBlockstackIDs_UserContacts_cid_fk ON ember.UserBlockstackIDs (cid);
INSERT INTO ember.UserBlockstackIDs (id, BlockstackID, cid, updated_at, created_at) VALUES (15, 'xaviablaza.id', 52, '2018-04-26 00:58:59', '2018-04-26 00:58:59');
INSERT INTO ember.UserBlockstackIDs (id, BlockstackID, cid, updated_at, created_at) VALUES (18, '19f1y4XRnuvPYhcPuZnCRsjeuuBx2j5Knk', 55, '2018-04-26 02:51:23', '2018-04-26 02:51:23');