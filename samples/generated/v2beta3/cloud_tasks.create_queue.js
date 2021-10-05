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

function main(parent, queue) {
  // [START cloudtasks_v2beta3_generated_CloudTasks_CreateQueue_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The location name in which the queue will be created.
   *  For example: `projects/PROJECT_ID/locations/LOCATION_ID`
   *  The list of allowed locations can be obtained by calling Cloud
   *  Tasks' implementation of
   *  [ListLocations][google.cloud.location.Locations.ListLocations].
   */
  // const parent = 'abc123'
  /**
   *  Required. The queue to create.
   *  [Queue's name][google.cloud.tasks.v2beta3.Queue.name] cannot be the same as an existing queue.
   */
  // const queue = ''

  // Imports the Tasks library
  const {CloudTasksClient} = require('@google-cloud/tasks').v2beta3;

  // Instantiates a client
  const tasksClient = new CloudTasksClient();

  async function createQueue() {
    // Construct request
    const request = {
      parent,
      queue,
    };

    // Run request
    const response = await tasksClient.createQueue(request);
    console.log(response);
  }

  createQueue();
  // [END cloudtasks_v2beta3_generated_CloudTasks_CreateQueue_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
