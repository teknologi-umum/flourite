import type { LanguagePattern } from '../types';

export const SQL: LanguagePattern[] = [
  { pattern: /CREATE (TABLE|DATABASE)/, points: 2, nearTop: true },
  { pattern: /DROP (TABLE|DATABASE)/, points: 2, nearTop: true },
  { pattern: /SHOW DATABASES/, points: 2, nearTop: true },
  { pattern: /INSERT INTO/, points: 2 },
  { pattern: /(SELECT|SELECT DISTINCT)\s/, points: 1 },
  { pattern: /INNER JOIN/, points: 1 },
  { pattern: /GROUP BY/, points: 1 },
  { pattern: /(END;|COMMIT;)/, points: 1 },

  { pattern: /UPDATE\s+\w+\sSET/, points: 1 },
  { pattern: /VALUES+(\s+\(\w|\(\w)/, points: 1 },
  // Comments
  { pattern: /--\s\w/, points: 1 },
  // Data types
  { pattern: /(VARCHAR|CHAR|BINARY|VARBINARY|BLOB|TEXT)\([0-9]+\)/, points: 1 },
  { pattern: /(BIT|TINYINT|SMALLINT|MEDIUMINT|INT|INTEGER|BIGINT|DOUBLE)\([0-9]+\)/, points: 1 },
  { pattern: /(TINYBLOB|TINYTEXT|MEDIUMTEXT|MEDIUMBLOB|LONGTEXT|LONGBLOB)/, points: 1 },
  { pattern: /(BOOLEAN|BOOL|DATE|YEAR)/, points: 1 },
];
