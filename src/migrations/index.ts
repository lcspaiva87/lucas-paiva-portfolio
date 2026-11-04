import * as migration_20261103_211201_initial from './20261103_211201_initial';
import * as migration_20261104_004032_localization from './20261104_004032_localization';

export const migrations = [
  {
    up: migration_20261103_211201_initial.up,
    down: migration_20261103_211201_initial.down,
    name: '20261103_211201_initial',
  },
  {
    up: migration_20261104_004032_localization.up,
    down: migration_20261104_004032_localization.down,
    name: '20261104_004032_localization'
  },
];
