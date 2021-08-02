CREATE TABLE "cycle" ("code"	TEXT,"nom"	TEXT,PRIMARY KEY("code"));
CREATE TABLE "formation" (	"code"	TEXT,	"nom"	TEXT,	PRIMARY KEY("code"));
INSERT or IGNORE INTO cycle VALUES ('D','DUT');
INSERT or IGNORE INTO cycle VALUES ('L','Licence');
INSERT or IGNORE INTO cycle VALUES ('M','Master');