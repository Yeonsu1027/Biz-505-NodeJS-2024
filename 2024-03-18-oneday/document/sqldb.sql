CREATE DATABASE std0318db;
USE std0318db;

CREATE TABLE tbl_student
(
s_stdnum	VARCHAR(5)		PRIMARY KEY,
s_name	VARCHAR(20)	NOT NULL,
s_dept 	VARCHAR(20)	NOT NULL,
s_grade INT NOT NULL,
s_tel VARCHAR(20)	NOT NULL,
s_address VARCHAR(100)	NOT NULL
);

CREATE TABLE tbl_score
(
c_seq INT AUTO_INCREMENT,
c_sstdnum	VARCHAR(5)	NOT NULL,
c_subject	VARCHAR(20)	NOT NULL,
c_score	INT	NOT NULL
);

CREATE TABLE tbl_subject (
sb_sbcode	VARCHAR(5)	NOT NULL	,
sb_subject	VARCHAR(20)		PRIMARY KEY
);

SELECT * FROM tbl_score;
SELECT * FROM tbl_student;
SELECT * FROM tbl_subject;


-- score 와 학번 연결
ALTER TABLE tbl_score
ADD CONSTRAINT STD_SCORE
FOREIGN KEY (c_sstdnum)
REFERENCES tbl_student(s_stdnum) ;

-- 과목코드와 성적정보의 과목 연결
ALTER TABLE  tbl_score
ADD CONSTRAINT SUB_SCORE
FOREIGN KEY (c_subject)
REFERENCES tbl_subject(sb_subject);

DROP DATABASE std0318db;