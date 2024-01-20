-- This file is automatically generated using maintenance/generateSchemaChangeSql.php.
-- Source: maintenance/abstractSchemaChanges/patch-externallinks-el_to_default.json
-- Do not modify this file directly.
-- See https://www.mediawiki.org/wiki/Manual:Schema_changes
CREATE TEMPORARY TABLE /*_*/__temp__externallinks AS
SELECT  el_id,  el_from,  el_to,  el_index,  el_index_60,  el_to_domain_index,  el_to_path
FROM  /*_*/externallinks;
DROP  TABLE  /*_*/externallinks;
CREATE TABLE  /*_*/externallinks (    el_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,    el_from INTEGER UNSIGNED DEFAULT 0 NOT NULL,    el_to BLOB DEFAULT '', el_index BLOB DEFAULT '',    el_index_60 BLOB DEFAULT '' NOT NULL,    el_to_domain_index BLOB DEFAULT '' NOT NULL,    el_to_path BLOB DEFAULT NULL  );
INSERT INTO  /*_*/externallinks (    el_id, el_from, el_to, el_index, el_index_60,    el_to_domain_index, el_to_path  )
SELECT  el_id,  el_from,  el_to,  el_index,  el_index_60,  el_to_domain_index,  el_to_path
FROM  /*_*/__temp__externallinks;
DROP  TABLE /*_*/__temp__externallinks;
CREATE INDEX el_from ON  /*_*/externallinks (el_from);
CREATE INDEX el_to ON  /*_*/externallinks (el_to, el_from);
CREATE INDEX el_index ON  /*_*/externallinks (el_index);
CREATE INDEX el_index_60 ON  /*_*/externallinks (el_index_60, el_id);
CREATE INDEX el_from_index_60 ON  /*_*/externallinks (el_from, el_index_60, el_id);
CREATE INDEX el_to_domain_index_to_path ON  /*_*/externallinks (el_to_domain_index, el_to_path);