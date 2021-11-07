import type { LanguagePattern } from '../types';

export const SQL: LanguagePattern[] = [
  { pattern: /CREATE (TABLE|DATABASE)/, type: 'keyword', nearTop: true },
  { pattern: /DROP (TABLE|DATABASE)/, type: 'keyword', nearTop: true },
  { pattern: /SHOW DATABASES/, type: 'keyword', nearTop: true },
  { pattern: /INSERT INTO/, type: 'keyword' },
  { pattern: /(SELECT|SELECT DISTINCT)\s/, type: 'keyword' },
  { pattern: /INNER JOIN/, type: 'keyword' },
  { pattern: /(GROUP|ORDER) BY/, type: 'keyword' },
  { pattern: /(END;|COMMIT;)/, type: 'keyword' },

  { pattern: /UPDATE\s+\w+\sSET/, type: 'keyword' },
  { pattern: /VALUES+(\s+\(\w|\(\w)/, type: 'keyword' },
  // Comments
  { pattern: /--\s\w/, type: 'comment.line' },
  // Data types
  { pattern: /(VARCHAR|CHAR|BINARY|VARBINARY|BLOB|TEXT)\([0-9]+\)/, type: 'constant.type' },
  { pattern: /(BIT|TINYINT|SMALLINT|MEDIUMINT|INT|INTEGER|BIGINT|DOUBLE)\([0-9]+\)/, type: 'constant.type' },
  { pattern: /(TINYBLOB|TINYTEXT|MEDIUMTEXT|MEDIUMBLOB|LONGTEXT|LONGBLOB)/, type: 'constant.type' },
  { pattern: /(BOOLEAN|BOOL|DATE|YEAR)/, type: 'constant.type' },
  // Math
  { pattern: /(EXP|SUM|SQRT|MIN|MAX)/, type: 'keyword.operator' },
  // Avoiding Lua
  { pattern: /local\s(function|\w+)?\s=\s/, type: 'not' },
  { pattern: /(require|dofile)\((.*)\)/, type: 'not' },
];
