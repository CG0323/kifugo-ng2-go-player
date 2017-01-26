import { DirectoryService} from './directory.service';
import { CoreService} from './core.service';

export const GO_PROVIDERS: any[] = [
  DirectoryService,
  CoreService
];

export * from './directory.service';
export * from './core.service';
