CREATE TABLE ember.UserEmails
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cid int(11) NOT NULL,
    Email varchar(255) NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT UserEmails_UserContacts_cid_fk FOREIGN KEY (cid) REFERENCES UserContacts (cid)
);
CREATE UNIQUE INDEX UserEmails_Email_uindex ON ember.UserEmails (Email);
CREATE INDEX UserEmails_UserContacts_cid_fk ON ember.UserEmails (cid);