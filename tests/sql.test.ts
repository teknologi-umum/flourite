import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src/index";

test("hello world", () => {
  const code = detectLang("SELECT 'Hello world!' text FROM dual;");
  assert.equal(code.language, "SQL");
});

test("fizz buzz", () => {
  const code = detectLang(`-- Load some numbers
  CREATE TABLE numbers(i INTEGER);
  INSERT INTO numbers VALUES(1);
  INSERT INTO numbers SELECT i + (SELECT MAX(i) FROM numbers) FROM numbers;
  INSERT INTO numbers SELECT i + (SELECT MAX(i) FROM numbers) FROM numbers;
  INSERT INTO numbers SELECT i + (SELECT MAX(i) FROM numbers) FROM numbers;
  INSERT INTO numbers SELECT i + (SELECT MAX(i) FROM numbers) FROM numbers;
  INSERT INTO numbers SELECT i + (SELECT MAX(i) FROM numbers) FROM numbers;
  INSERT INTO numbers SELECT i + (SELECT MAX(i) FROM numbers) FROM numbers;
  INSERT INTO numbers SELECT i + (SELECT MAX(i) FROM numbers) FROM numbers;
  -- Define the fizzes and buzzes
  CREATE TABLE fizzbuzz (message VARCHAR(8), divisor INTEGER);
  INSERT INTO fizzbuzz VALUES('fizz',      3);
  INSERT INTO fizzbuzz VALUES('buzz',      5);
  INSERT INTO fizzbuzz VALUES('fizzbuzz', 15);
  -- Play fizzbuzz
  SELECT COALESCE(MAX(message),CAST(i AS VARCHAR(99))) AS RESULT
  FROM numbers LEFT OUTER JOIN fizzbuzz ON MOD(i,divisor) = 0
  GROUP BY i
  HAVING i <= 100
  ORDER BY i;
  -- Tidy up
  DROP TABLE fizzbuzz;
  DROP TABLE numbers;`);
  assert.equal(code.language, "SQL");
});

test("date manipulation", () => {
  const code = detectLang(`-- March 7 2009 7:30pm EST
 
  SELECT 
  TO_TIMESTAMP_TZ(
  'March 7 2009 7:30pm EST',
  'MONTH DD YYYY HH:MIAM TZR'
  )
  at TIME zone 'US/Eastern' orig_dt_time
  FROM dual;
   
  -- 12 hours later DST change
   
  SELECT 
  (TO_TIMESTAMP_TZ(
  'March 7 2009 7:30pm EST',
  'MONTH DD YYYY HH:MIAM TZR'
  )+
  INTERVAL '12' HOUR)
  at TIME zone 'US/Eastern' plus_12_dst
  FROM dual;
   
  -- 12 hours later no DST change
  -- Arizona time, always MST
   
  SELECT 
  (TO_TIMESTAMP_TZ(
  'March 7 2009 7:30pm EST',
  'MONTH DD YYYY HH:MIAM TZR'
  )+
  INTERVAL '12' HOUR)
  at TIME zone 'US/Arizona' plus_12_nodst
  FROM dual;`);
  assert.equal(code.language, "SQL");
});

test("merge and aggregate", () => {
  const code = detectLang(`-- drop tables
  DROP TABLE IF EXISTS tmp_patients;
  DROP TABLE IF EXISTS tmp_visits;
   
  -- create tables
  CREATE TABLE tmp_patients(
    PATIENT_ID INT,
    LASTNAME VARCHAR(20)
  );
   
  CREATE TABLE tmp_visits(
    PATIENT_ID INT,
    VISIT_DATE DATE,
    SCORE NUMERIC(4,1)
  );
   
  -- load data from csv files
  /*
  -- Note: LOAD DATA LOCAL requires \`local-infile\` enabled on both the client and server else you get error "#1148 command is not allowed.."
  LOAD DATA LOCAL INFILE '/home/csv/patients.csv' INTO TABLE \`tmp_patients\` FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;
  LOAD DATA LOCAL INFILE '/home/csv/visits.csv' INTO TABLE \`tmp_visits\` FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;
  */
   
  -- load data hard coded
  INSERT INTO tmp_patients(PATIENT_ID, LASTNAME)
  VALUES
  (1001, 'Hopper'),
  (4004, 'Wirth'),
  (3003, 'Kemeny'),
  (2002, 'Gosling'),
  (5005, 'Kurtz');
   
  INSERT INTO tmp_visits(PATIENT_ID, VISIT_DATE, SCORE)
  VALUES
  (2002, '2020-09-10', 6.8),
  (1001, '2020-09-17', 5.5),
  (4004, '2020-09-24', 8.4),
  (2002, '2020-10-08', NULL),
  (1001, NULL, 6.6),
  (3003, '2020-11-12', NULL),
  (4004, '2020-11-05', 7.0),
  (1001, '2020-11-19', 5.3);
   
  -- join tables and group
  SELECT
    p.PATIENT_ID,
    p.LASTNAME,
    MAX(VISIT_DATE) AS LAST_VISIT,
    SUM(SCORE) AS SCORE_SUM,
    CAST(AVG(SCORE) AS DECIMAL(10,2)) AS SCORE_AVG
  FROM
    tmp_patients p
    LEFT JOIN tmp_visits v
      ON v.PATIENT_ID = p.PATIENT_ID
  GROUP BY
    p.PATIENT_ID,
    p.LASTNAME
  ORDER BY
    p.PATIENT_ID;`);
  assert.equal(code.language, "SQL");
});

test("fibonacci sequence", () => {
  const code = detectLang(`SELECT round ( EXP ( SUM (ln ( ( 1 + SQRT( 5 ) ) / 2)
  ) OVER ( ORDER BY level ) ) / SQRT( 5 ) ) fibo
FROM dual
CONNECT BY level <= 10;`);
  assert.equal(code.language, "SQL");
});

test("integer comparison", () => {
  const code = detectLang(`SELECT to_char(a)||' is less than '||to_char(b) less_than
  FROM test
  WHERE a < b;
   
  SELECT to_char(a)||' is equal to '||to_char(b) equal_to
  FROM test
  WHERE a = b;
   
  SELECT to_char(a)||' is greater than '||to_char(b) greater_than
  FROM test
  WHERE a > b;`);
  assert.equal(code.language, "SQL");
});

test.run();
