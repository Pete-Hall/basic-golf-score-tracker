CREATE TABLE scores(
	"id" serial PRIMARY KEY,
	"date" varchar(15),
	"course" varchar(128),
	"par" varchar(10),
	"front_nine" varchar(10),
	"back_nine" varchar(10),
	"total" varchar(10)
);

SELECT * FROM scores;

INSERT INTO scores (date, course, par, front_nine, back_nine, total) VALUES ('2022-05-14', 'Imaginary CC', '72', '43', '44', '87');