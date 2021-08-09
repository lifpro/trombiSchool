CREATE TABLE "cycle" ("code"	TEXT,"nom"	TEXT,PRIMARY KEY("code"));
CREATE TABLE "centre" ("code"	TEXT,"nom"	TEXT,"latitude" TEXT,"longitude" TEXT,PRIMARY KEY("code"));
CREATE TABLE "formation" (	"code"	TEXT,	"nom"	TEXT,	PRIMARY KEY("code"));
INSERT or IGNORE INTO cycle VALUES ('DUT','DUT');
INSERT or IGNORE INTO cycle VALUES ('LIC','Licence');
INSERT or IGNORE INTO cycle VALUES ('MAS','Master');
INSERT or IGNORE INTO cycle VALUES ('DOC','Doctorat');