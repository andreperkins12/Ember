CREATE TABLE ember.UserLoginTimes
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cid int(11) NOT NULL,
    Login datetime NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT UserLoginTimes_UserContacts_cid_fk FOREIGN KEY (cid) REFERENCES UserContacts (cid)
);
CREATE INDEX UserLoginTimes_UserContacts_cid_fk ON ember.UserLoginTimes (cid);