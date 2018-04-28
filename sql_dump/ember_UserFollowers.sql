CREATE TABLE ember.UserFollowers
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cid int(11) NOT NULL,
    ProfileID int(11) NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT UserFollowers_UserContacts_cid_fk FOREIGN KEY (cid) REFERENCES UserContacts (cid),
    CONSTRAINT UserFollowers_UserContacts_cid_fk_2 FOREIGN KEY (ProfileID) REFERENCES UserContacts (cid)
);
CREATE INDEX UserFollowers_UserContacts_cid_fk ON ember.UserFollowers (cid);
CREATE INDEX UserFollowers_UserContacts_cid_fk_2 ON ember.UserFollowers (ProfileID);
INSERT INTO ember.UserFollowers (id, cid, ProfileID, updated_at, created_at) VALUES (1, 52, 69, '2018-04-26 03:33:45', '2018-04-26 03:33:45');