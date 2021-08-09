export interface LanguagePattern {
  pattern: RegExp;
  points: number;
  nearTop?: boolean;
}

export interface Options {
  heuristic: boolean;
  statistics: false;
}

export interface StatisticOutput {
  detected: string;
  statistics: (string | number)[][];
}
