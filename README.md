# aws-learn-dev

> Simple Express/Nuxt.js project that renders First 10 articles from [y-combinator](https://news.ycombinator.com) page and users can add themselves to subscription list, send SNS service(Email, JSON) to users, and add the email address to local DynamoDB. I created this project to learn some concepts of AWS by actually writing some code that handles some concepts of Amazon SNS, DynamoDB and Lambda.

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```

## Set up the Local DynamoDB
First, you need to download local dynamoDB in your machine. Click [Here](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) to download the localDB.

Once localDB is set up, go to the localDB folder to run below in your terminal.

```bash
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

Once your local DynamoDB is running, then you can start to run the application by following the Build Setup Stage section.

## Configure the credentials and settings for your aws
I assume you have set up your aws account. If you have done yet, Please go to [AWS](aws.amazon.com/getting-started/) to create your account. In this application, there are three things of AWS we are learning:

- AWS SNS(Amazon Simple Notification Service) - [Link](https://aws.amazon.com/sns/)
- AWS Lambda - [Link](https://aws.amazon.com/lambda/)
- AWS DynamoDB - [Link](https://aws.amazon.com/dynamodb/)

Since this application was for my learning purpose and simple, all of the events code are in `index.vue` file. You can feel use/update this repository. Make sure to add your credentials correctly to set up the Local DynamoDB and the SNS service / Lambda correctly.

## Nuxt.js / Express.js / Vue.js / Backpack

This app is composed of [Nuxt.js](https://github.com/nuxt/nuxt.js) and [Express.js](http://expressjs.com/) and
[Vue.js](https://vuejs.org/).

This app uses [backpack](https://github.com/palmerhq/backpack) to watch and build the application, so you can use the latest ES6 features (module syntax, async/await, etc.).
