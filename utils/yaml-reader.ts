import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as yaml from 'js-yaml';

export function readYaml<T = any>(file: string): T {
  return yaml.load(readFileSync(resolve(process.cwd(), file), 'utf-8')) as T;
}