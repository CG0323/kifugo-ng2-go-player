import { KifuService} from './kifu.service';
import { CoreService} from './core.service';

export const KIFUGO_PROVIDERS: any[] = [
  KifuService,
  CoreService
];

export * from './kifu.service';
export * from './core.service';
