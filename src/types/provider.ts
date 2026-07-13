import type {ProviderResult} from '../models/result';


export interface Provider {
  name: string;

  check(name: string): Promise<ProviderResult>;
}