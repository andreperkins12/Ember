CREATE TABLE ember.UserImages
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cid int(11) NOT NULL,
    pid int(11) NOT NULL,
    ResourceURI varchar(512) NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT UserImages_UserContacts_cid_fk FOREIGN KEY (cid) REFERENCES UserContacts (cid),
    CONSTRAINT UserImages_UserPosts_id_fk FOREIGN KEY (pid) REFERENCES UserPosts (id)
);
CREATE INDEX UserImages_UserContacts_cid_fk ON ember.UserImages (cid);
CREATE INDEX UserImages_UserPosts_id_fk ON ember.UserImages (pid);
INSERT INTO ember.UserImages (id, cid, pid, ResourceURI, updated_at, created_at) VALUES (1, 52, 3, 'https://i.stack.imgur.com/6BkJB.png', '2018-04-26 01:04:03', '2018-04-26 01:04:03');
INSERT INTO ember.UserImages (id, cid, pid, ResourceURI, updated_at, created_at) VALUES (2, 69, 5, 'https://vignette.wikia.nocookie.net/animatedmusclewomen/images/b/b2/110c3bf3a21403db45c9c0029aa34515.jpg/revision/latest/scale-to-width-down/332?cb=20160816171335', '2018-04-26 03:35:07', '2018-04-26 03:35:07');