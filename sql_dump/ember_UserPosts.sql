CREATE TABLE ember.UserPosts
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cid int(11) NOT NULL,
    Content varchar(512) NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT UserPosts_UserContacts_cid_fk FOREIGN KEY (cid) REFERENCES UserContacts (cid)
);
CREATE INDEX UserPosts_UserContacts_cid_fk ON ember.UserPosts (cid);
INSERT INTO ember.UserPosts (id, cid, Content, updated_at, created_at) VALUES (2, 52, 'This is a test post.', '2018-04-26 01:02:45', '2018-04-26 01:02:45');
INSERT INTO ember.UserPosts (id, cid, Content, updated_at, created_at) VALUES (3, 52, 'This is a post with an image.', '2018-04-26 01:03:12', '2018-04-26 01:03:12');
INSERT INTO ember.UserPosts (id, cid, Content, updated_at, created_at) VALUES (4, 69, 'Jean Grey''s post.', '2018-04-26 03:34:17', '2018-04-26 03:34:17');
INSERT INTO ember.UserPosts (id, cid, Content, updated_at, created_at) VALUES (5, 69, 'Jean Grey''s post with image.', '2018-04-26 03:34:17', '2018-04-26 03:34:17');