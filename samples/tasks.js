/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

function createTask (project, location, queue) {
  // [START tasks_create_task]
  // Imports the Google Cloud Tasks library
  const cloudTasks = require('@google-cloud/tasks');

  // Instantiates a client
  const client = new cloudTasks.CloudTasksClient();

  // Construct the fully qualified queue name.
  const parent = client.queuePath(project, location, queue);

  // Prepare the payload.
  const task = {
    pullMessage: {
      payload: Buffer.from('a message for the recipient').toString('base64'),
    },
  };

  // Construct the request body.
  const request = {
    parent: parent,
    task: task,
  };

  client.createTask(request).then(response => {
      const task = response[0].name;
      console.log(`Created task ${task}`);
    }).catch(err => {
      console.log(`Error in createTask: ${err.message || err}`);
    });
    // [END tasks_create_task]
}

function pullTask (project, location, queue) {
  // [START tasks_pull_and_acknowledge_task]
  // Imports the Google Cloud Tasks library
  const cloudTasks = require('@google-cloud/tasks');

  // Instantiates a client
  const client = new cloudTasks.CloudTasksClient();

  // Construct the fully qualified queue name.
  const parent = client.queuePath(project, location, queue);

  // Construct the request body.
  const request = {
    parent: parent,
    leaseDuration: {
      seconds: 600,
    },
    maxTasks: 1,
    responseView: 'FULL',
  };

  client
    .leaseTask(request)
    .then(response => {
      const task = response;
      console.log(`Leased task ${task}`);
      return task;
    })
    .catch(err => {
      console.log(`Error in leaseTask: ${err.message || err}`);
    });
}

function acknowledgeTask (task) {
  // Imports the Google Cloud Tasks library
  const cloudTasks = require('@google-cloud/tasks');

  // Instantiates a client
  const client = new cloudTasks.CloudTasksClient();

  // Construct the fully qualified task name.
  // const task_parent = client.taskPath(project, location, queue, task);

  const request = {
    name: task.name,
    scheduleTime: task.scheduleTime,
  };

  client
    .acknowledgeTask(request)
    .then(response => {
      console.log(`Acknowledged task ${task.name}.`);
    })
    .catch(err => {
      console.log(`Error in acknowledgeTask: ${err.message || err}`);
    });
// [END tasks_pull_and_acknowledge_task]
}

require(`yargs`) // eslint-disable-line
  .demand(1)
  .command(
    `create <project> <location> <queue>`,
    `Create a task.`,
    {},
    (opts) => createTask(opts.project, opts.location, opts.queue)
  )
  .command(
    `pull <project> <location> <queue>`,
    `Pull a task.`,
    {},
    (opts) => pullTask(opts.project, opts.location, opts.queue)
  )
  .command(
    `acknowledge <task>`,
    `Acknowledge a task.`,
    {},
    (opts) => acknowledgeTask(JSON.parse(opts.task))
  )
  .example(`node $0 create my-project-id us-central1 my-queue`)
  .example(`node $0 pull my-project-id us-central1 my-queue`)
  .example(`node $0 acknowledge '{"name":"projects/my-project-id/locations/us-central1/queues/my-queue/tasks/1234","scheduleTime":"2017-11-01T22:27:53.628279Z"}'`)
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/cloud-tasks/docs`)
  .help()
  .strict().argv;
