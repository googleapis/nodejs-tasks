// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

function main(parent, task) {
  // [START cloudtasks_v2beta3_generated_CloudTasks_CreateTask_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The queue name. For example:
   *  `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
   *  The queue must already exist.
   */
  // const parent = 'abc123'
  /**
   *  Required. The task to add.
   *  Task names have the following format:
   *  `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`.
   *  The user can optionally specify a task [name][google.cloud.tasks.v2beta3.Task.name]. If a
   *  name is not specified then the system will generate a random
   *  unique task id, which will be set in the task returned in the
   *  [response][google.cloud.tasks.v2beta3.Task.name].
   *  If [schedule_time][google.cloud.tasks.v2beta3.Task.schedule_time] is not set or is in the
   *  past then Cloud Tasks will set it to the current time.
   *  Task De-duplication:
   *  Explicitly specifying a task ID enables task de-duplication.  If
   *  a task's ID is identical to that of an existing task or a task
   *  that was deleted or executed recently then the call will fail
   *  with [ALREADY_EXISTS][google.rpc.Code.ALREADY_EXISTS].
   *  If the task's queue was created using Cloud Tasks, then another task with
   *  the same name can't be created for ~1hour after the original task was
   *  deleted or executed. If the task's queue was created using queue.yaml or
   *  queue.xml, then another task with the same name can't be created
   *  for ~9days after the original task was deleted or executed.
   *  Because there is an extra lookup cost to identify duplicate task
   *  names, these [CreateTask][google.cloud.tasks.v2beta3.CloudTasks.CreateTask] calls have significantly
   *  increased latency. Using hashed strings for the task id or for
   *  the prefix of the task id is recommended. Choosing task ids that
   *  are sequential or have sequential prefixes, for example using a
   *  timestamp, causes an increase in latency and error rates in all
   *  task commands. The infrastructure relies on an approximately
   *  uniform distribution of task ids to store and serve tasks
   *  efficiently.
   */
  // const task = ''
  /**
   *  The response_view specifies which subset of the [Task][google.cloud.tasks.v2beta3.Task] will be
   *  returned.
   *  By default response_view is [BASIC][google.cloud.tasks.v2beta3.Task.View.BASIC]; not all
   *  information is retrieved by default because some data, such as
   *  payloads, might be desirable to return only when needed because
   *  of its large size or because of the sensitivity of data that it
   *  contains.
   *  Authorization for [FULL][google.cloud.tasks.v2beta3.Task.View.FULL] requires
   *  `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/)
   *  permission on the [Task][google.cloud.tasks.v2beta3.Task] resource.
   */
  // const responseView = ''

  // Imports the Tasks library
  const {CloudTasksClient} = require('@google-cloud/tasks').v2beta3;

  // Instantiates a client
  const tasksClient = new CloudTasksClient();

  async function createTask() {
    // Construct request
    const request = {
      parent,
      task,
    };

    // Run request
    const response = await tasksClient.createTask(request);
    console.log(response);
  }

  createTask();
  // [END cloudtasks_v2beta3_generated_CloudTasks_CreateTask_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
