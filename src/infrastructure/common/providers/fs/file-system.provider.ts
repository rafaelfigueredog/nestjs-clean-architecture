import { Provider } from '@nestjs/common';

import * as fs from 'fs';

export const FileSystemProvider: Provider = {
  provide: 'fs',
  useValue: fs,
};

export type FileSystemService = typeof fs;
