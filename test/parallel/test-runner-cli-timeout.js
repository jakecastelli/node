'use strict';
require('../common');
const fixtures = require('../common/fixtures');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const cwd = fixtures.path('test-runner', 'default-behavior');
const env = { ...process.env, 'NODE_DEBUG': 'test_runner' };

test('default timeout -- Infinity', () => {
  const args = ['--test'];
  const cp = spawnSync(process.execPath, args, { cwd, env });
  assert.match(cp.stderr.toString(), /timeout: Infinity,/);
});

test('timeout of 10ms', () => {
  const args = ['--test', '--test-timeout', 10];
  const cp = spawnSync(process.execPath, args, { cwd, env });
  assert.match(cp.stderr.toString(), /timeout: 10,/);
});
