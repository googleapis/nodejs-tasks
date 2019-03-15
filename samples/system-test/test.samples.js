// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const path = require('path');
const {assert} = require('chai');
const execa = require('execa');
const uuid = require('uuid');

const PROJECT_ID = process.env.GCLOUD_PROJECT;
const queueName = `gcloud-${uuid.v4().split('-')[0]}`;
const url = `https://${PROJECT_ID}.appspot.com/log_payload`;
const cwd = path.join(__dirname, '..');
const exec = cmd => execa.shell(cmd, {cwd});

describe('Cloud Task Sample Tests', () => {
  it('should create a queue', async () => {
    const {stdout} = await exec(`node createQueue ${PROJECT_ID} ${queueName}`);
    assert.match(stdout, /Created queue/);
  });

  it('should create a task', async () => {
    const {stdout} = await exec(
      `node createTask.js ${PROJECT_ID} us-central1 my-queue payload`
    );
    assert.match(stdout, /Created task/);
  });

  it('should create an HTTP task', async () => {
    const {stdout} = await exec(
      `node createHttpTask.js ${PROJECT_ID} us-central1 ${queueName} ${url}`
    );
    assert.match(stdout, /Created task/);
  });

  it('should delete a queue', async () => {
    const {stdout} = await exec(`node deleteQueue ${PROJECT_ID} ${queueName}`);
    assert.match(stdout, /Deleted queue/);
  });
});
