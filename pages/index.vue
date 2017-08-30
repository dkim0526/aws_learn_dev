<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      ARTICLES
    </h1>
    <ul class="articles">
      <li v-for="(article, index) in articles" :key="index" class="article">
        <a :href=" article.link " target="_blank" replace>
          {{ article.name }}
        </a>
      </li>
    </ul>
    <a id="json_txt" v-on:click="subscribeJson(articles)" href="#">Subscribe the articles as a JSON</a><br/>
    <a id="email_txt" v-on:click="subscribeEmail(articles)" href="#">Subscribe the articles as a Email</a><br/>
    <a id="create_table_txt" v-on:click="createUserTable()">Click here to create user table!</a><br/>
    <input id="email_address" v-model="email_address" placeholder="email@address.com">
    <a id="add_user_txt" v-on:click="addUser(email_address)">Click here to add yourself to the subscription!</a>

  </section>
</template>
<script>
import axios from '~/plugins/axios'
var AWS = require('aws-sdk')
export default {
  async asyncData () {
    let { data } = await axios.get('/api/articles')
    return { articles: data, email_address: [] }
  },
  head () {
    return {
      title: 'Articles'
    }
  },
  methods: {
    subscribeJson (data) {
      AWS.config.update({ region: 'us-east-1' })
      AWS.config.accessKeyId = 'xxx'
      AWS.config.secretAccessKey = 'xxx'
      const sns = new AWS.SNS()
      var params = {
        Message: JSON.stringify(data),
        Subject: 'Test SNS From Lambda',
        TopicArn: 'xxx'
      }
      sns.publish(params, function (err, data) {
        if (err) {
          console.log(err.stack)
          return
        }
        console.log('JSON Subscription push sent')
        // console.log(data)
      })
    },
    subscribeEmail (data) {
      AWS.config.update({ region: 'xxx' })
      AWS.config.accessKeyId = 'xxx'
      AWS.config.secretAccessKey = 'xxx'
      const sns = new AWS.SNS()
      var content = ''
      for (var index = 0; index < data.length; index++) {
        content += ('Article' + (index + 1) + ': ' + data[index].name + '\tLink : ' + data[index].link + '\n')
      }
      var params = {
        Message: content,
        Subject: 'Test SNS From Lambda',
        TopicArn: 'xxx'
      }
      sns.publish(params, function (err, data) {
        if (err) {
          console.log(err.stack)
          return
        }
        console.log('Email Subscription Push sent')
      })
    },
    createUserTable () {
      AWS.config.accessKeyId = 'xxx'
      AWS.config.secretAccessKey = 'xxx'
      var cred = new AWS.Credentials('xxx', 'xxx')
      AWS.config.update({
        region: 'xxx',
        endpoint: 'http://localhost:8000',
        credentials: cred
      })
      var dynamodb = new AWS.DynamoDB()
      var params = {
        TableName: 'Users',
        KeySchema: [
          { AttributeName: 'email_address', KeyType: 'HASH' }
        ],
        AttributeDefinitions: [
          { AttributeName: 'email_address', AttributeType: 'S' }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
      dynamodb.createTable(params, function (err, data) {
        if (err) {
          console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
        } else {
          console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
        }
      })
    },
    addUser (data) {
      // var emailAddress = data
      if (data.length <= 0) {
        alert('Please write email address in the email section!')
        return
      }
      AWS.config.accessKeyId = 'xxx'
      AWS.config.secretAccessKey = 'xxx'
      var cred = new AWS.Credentials('xxx', 'xxx')
      AWS.config.update({
        region: 'sa-east-1',
        endpoint: 'xxx',
        credentials: cred
      })
      var docClient = new AWS.DynamoDB.DocumentClient()
      console.log('Triggered!')
      console.log(data.length)
      console.log(data)
      var params = {
        TableName: 'Users',
        Item: {
          email_address: data
        }
      }
      // update the table
      docClient.put(params, function (err, data) {
        if (err) {
          console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
        } else {
          console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
          var params = {
            Protocol: 'xxx', /* required */
            TopicArn: 'xxx', /* required */
            Endpoint: 'xxx'
          }
          AWS.config.accessKeyId = 'xxx'
          AWS.config.secretAccessKey = 'xxx'
          var cred = new AWS.Credentials('xxx', 'xxx')
          AWS.config.update({
            region: 'xxx',
            endpoint: 'xxx',
            credentials: cred
          })
          const sns = new AWS.SNS()
          sns.subscribe(params, function (err, data) {
            if (err) console.log(err, err.stack) // an error occurred
            else console.log(data) // successful response
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.articles
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.article
{
  margin: 10px 0;
}
#json_txt
{
  color: orange;
}
#email_txt
{
  color: orangered;
}
#add_user_txt
{
  color: #9e411f;
}


</style>
