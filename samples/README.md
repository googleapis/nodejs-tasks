# Node.js Google Cloud Tasks Samples

This sample application shows how to use [Google Cloud Tasks](https://cloud.google.com/cloud-tasks/)
client library.

`createTask.js` constructs a task with an App Engine target and pushes it
to your queue.

`server.js` is a task handler. This example app that has an endpoint to
receive App Engine task attempts.

`createHttpTask.js` constructs a task with an HTTP target and pushes it
to your queue.

`createHttpTaskWithToken.js` constructs a task with an HTTP target and OIDC
token and pushes it to your queue.

* [Setup](#setup)
* [Running locally](#running-locally)
* [Deploying to App Engine](#deploying-to-app-engine)
* [Running the tests](#running-the-tests)

## Setup

Before you can run or deploy the sample, you need to do the following:

1.  Refer to the [appengine/README.md][readme] file for instructions on
    running and deploying.
1.  Enable the Cloud Tasks API in the [Google Cloud Console](https://console.cloud.google.com/apis/api/tasks.googleapis.com).
1.  Set up [Google Application Credentials](https://cloud.google.com/docs/authentication/getting-started).
1.  Install dependencies:

    With `npm`:

        npm install

    or with `yarn`:

        yarn install

## Creating a queue

To create a queue using the Cloud SDK, use the following gcloud command:

    gcloud beta tasks queues create <QUEUE_NAME>

## Run the Sample Using the Command Line

Set environment variables:

First, your project ID:

```
export PROJECT_ID=<PROJECT_ID>
```

Then the queue ID, as specified at queue creation time. Queue IDs already
created can be listed with `gcloud beta tasks queues list`.

```
export QUEUE_ID=<QUEUE_NAME>
```

And finally the location ID, which can be discovered with
`gcloud beta tasks queues describe $QUEUE_ID`, with the location embedded in
the "name" value (for instance, if the name is
"projects/my-project/locations/us-central1/queues/my-queue", then the
location is "us-central1").

```
export LOCATION_ID=us-central1
```

### Creating Tasks with App Engine Targets

Running the sample will create a task, targeted at the `/log_payload`
endpoint, with a payload `hello`:

```
node createTask.js $PROJECT_ID $LOCATION_ID $QUEUE_ID hello
```

Create a task that will be scheduled for a time in the future by appending the
wait time in seconds:

```
node createTask.js $PROJECT_ID $LOCATION_ID $QUEUE_ID hello 30
```

#### Using an App Engine Task Handler

Deploy to App Engine Standard environment with gcloud:

    gcloud app deploy

Verify the index page is serving:

    gcloud app browse

The App Engine app serves as a target for the push requests. It has an
endpoint `/log_payload` that reads the payload (i.e., the request body) of the
HTTP POST request and logs it. The log output can be viewed with:

    gcloud app logs read

### Creating Tasks with App Engine Targets

Set an environment variable for the endpoint to your task handler. This is an
example url:
```
export URL=https://example.com/taskhandler
```

Running the sample will create a task and send the task to the specific URL
endpoint, with a payload specified:

```
node createHttpTask $PROJECT_ID $LOCATION_ID $QUEUE_ID $URL hello
```

### Using HTTP Targets with Authentication Tokens

Your Cloud Tasks [service account][sa],
(service-<project-number>@gcp-sa-cloudtasks.iam.gserviceaccount.com), must
have the role of: `Service Account Token Creator` to generate a tokens.

Create or use an existing [service account][sa] to authenticate the OIDC token
and set an environment variable:
```
export SERVICE_ACCOUNT=<SERVICE_ACCOUNT_EMAIL>
```

Running the sample with command:
```
node createHttpTaskWithToken $PROJECT_ID $LOCATION_ID $QUEUE_ID $URL $SERVICE_ACCOUNT hello
```


## More Info

To get usage information: `node createTask.js --help`

Which prints:

```
Options:
  --version        Show version number                                                                         [boolean]
  --location, -l   Location of the queue to add the task to.                                         [string] [required]
  --queue, -q      ID (short name) of the queue to add the task to.                                  [string] [required]
  --project, -p    Project of the queue to add the task to.                                          [string] [required]
  --payload, -d    (Optional) Payload to attach to the push queue.                                              [string]
  --inSeconds, -s  (Optional) The number of seconds from now to schedule task attempt.                          [number]
  --help           Show help                                                                                   [boolean]

Examples:
  node createTask.js --project my-project-id

For more information, see https://cloud.google.com/cloud-tasks
```

[appengine]: https://cloud.google.com/appengine/docs/nodejs
[appengine-std]: https://cloud.google.com/appengine/docs/standard/nodejs
[sa]: https://cloud.google.com/iam/docs/service-accounts
