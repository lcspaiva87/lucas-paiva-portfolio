import * as migration_20261103_211201_initial from './20261103_211201_initial';

export const migrations = [
  {
    up: migration_20261103_211201_initial.up,
    down: migration_20261103_211201_initial.down,
    name: '20261103_211201_initial'
  },
];
