export interface LanguagePattern {
  pattern: RegExp;
  points: number;
  nearTop?: boolean;
}

export interface Options {
  heuristic?: boolean;
  statistics?: boolean;
  shiki?: boolean;
}

export interface StatisticOutput {
  detected: string;
  statistics: Record<string, number>;
}
