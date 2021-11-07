import type { LanguagePattern } from '../types';

const KEYWORDS = [
  'ADD',
  'ARG',
  'AS',
  'CMD',
  'COPY',
  'CROSS_BUILD',
  'ENTRYPOINT',
  'ENV',
  'EXPOSE',
  'FROM',
  'HEALTHCHECK',
  'LABEL',
  'MAINTAINER',
  'ONBUILD',
  'RUN',
  'SHELL',
  'STOPSIGNAL',
  'USER',
  'VOLUME',
  'WORKDIR',
];

export const Dockerfile: LanguagePattern[] = [
  // Keywords
  // This should be enough to identify dockerfile since they always exist
  { pattern: new RegExp(`^(${KEYWORDS.join('|')})`), type: 'keyword' },
];
