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

function main(parent, leaseDuration) {
  // [START cloudtasks_v2beta2_generated_CloudTasks_LeaseTasks_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The queue name. For example:
   *  `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
   */
  // const parent = 'abc123'
  /**
   *  The maximum number of tasks to lease.
   *  The system will make a best effort to return as close to as
   *  `max_tasks` as possible.
   *  The largest that `max_tasks` can be is 1000.
   *  The maximum total size of a [lease tasks response][google.cloud.tasks.v2beta2.LeaseTasksResponse] is
   *  32 MB. If the sum of all task sizes requested reaches this limit,
   *  fewer tasks than requested are returned.
   */
  // const maxTasks = 1234
  /**
   *  Required. The duration of the lease.
   *  Each task returned in the [response][google.cloud.tasks.v2beta2.LeaseTasksResponse] will
   *  have its [schedule_time][google.cloud.tasks.v2beta2.Task.schedule_time] set to the current
   *  time plus the `lease_duration`. The task is leased until its
   *  [schedule_time][google.cloud.tasks.v2beta2.Task.schedule_time]; thus, the task will not be
   *  returned to another [LeaseTasks][google.cloud.tasks.v2beta2.CloudTasks.LeaseTasks] call
   *  before its [schedule_time][google.cloud.tasks.v2beta2.Task.schedule_time].
   *  After the worker has successfully finished the work associated
   *  with the task, the worker must call via
   *  [AcknowledgeTask][google.cloud.tasks.v2beta2.CloudTasks.AcknowledgeTask] before the
   *  [schedule_time][google.cloud.tasks.v2beta2.Task.schedule_time]. Otherwise the task will be
   *  returned to a later [LeaseTasks][google.cloud.tasks.v2beta2.CloudTasks.LeaseTasks] call so
   *  that another worker can retry it.
   *  The maximum lease duration is 1 week.
   *  `lease_duration` will be truncated to the nearest second.
   */
  // const leaseDuration = ''
  /**
   *  The response_view specifies which subset of the [Task][google.cloud.tasks.v2beta2.Task] will be
   *  returned.
   *  By default response_view is [BASIC][google.cloud.tasks.v2beta2.Task.View.BASIC]; not all
   *  information is retrieved by default because some data, such as
   *  payloads, might be desirable to return only when needed because
   *  of its large size or because of the sensitivity of data that it
   *  contains.
   *  Authorization for [FULL][google.cloud.tasks.v2beta2.Task.View.FULL] requires
   *  `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/)
   *  permission on the [Task][google.cloud.tasks.v2beta2.Task] resource.
   */
  // const responseView = ''
  /**
   *  `filter` can be used to specify a subset of tasks to lease.
   *  When `filter` is set to `tag=<my-tag>` then the
   *  [response][google.cloud.tasks.v2beta2.LeaseTasksResponse] will contain only tasks whose
   *  [tag][google.cloud.tasks.v2beta2.PullMessage.tag] is equal to `<my-tag>`. `<my-tag>` must be
   *  less than 500 characters.
   *  When `filter` is set to `tag_function=oldest_tag()`, only tasks which have
   *  the same tag as the task with the oldest
   *  [schedule_time][google.cloud.tasks.v2beta2.Task.schedule_time] will be returned.
   *  Grammar Syntax:
   *  * `filter = "tag=" tag | "tag_function=" function`
   *  * `tag = string`
   *  * `function = "oldest_tag()"`
   *  The `oldest_tag()` function returns tasks which have the same tag as the
   *  oldest task (ordered by schedule time).
   *  SDK compatibility: Although the SDK allows tags to be either
   *  string or
   *  [bytes](https://cloud.google.com/appengine/docs/standard/java/javadoc/com/google/appengine/api/taskqueue/TaskOptions.html#tag-byte:A-),
   *  only UTF-8 encoded tags can be used in Cloud Tasks. Tag which
   *  aren't UTF-8 encoded can't be used in the
   *  [filter][google.cloud.tasks.v2beta2.LeaseTasksRequest.filter] and the task's
   *  [tag][google.cloud.tasks.v2beta2.PullMessage.tag] will be displayed as empty in Cloud Tasks.
   */
  // const filter = 'abc123'

  // Imports the Tasks library
  const {CloudTasksClient} = require('@google-cloud/tasks').v2beta2;

  // Instantiates a client
  const tasksClient = new CloudTasksClient();

  async function leaseTasks() {
    // Construct request
    const request = {
      parent,
      leaseDuration,
    };

    // Run request
    const response = await tasksClient.leaseTasks(request);
    console.log(response);
  }

  leaseTasks();
  // [END cloudtasks_v2beta2_generated_CloudTasks_LeaseTasks_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
