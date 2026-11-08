export interface ScanFinding {
  file: string;
  rule: 'env-line' | 'private-key' | 'secret' | 'host';
  match: string;
}

export function scanDemo(dir: string, allowHosts?: string[]): ScanFinding[];
export const DEFAULT_ALLOW_HOSTS: string[];
