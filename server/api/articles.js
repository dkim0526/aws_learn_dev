import { Router } from 'express'

const router = Router()

// crwaling for ycombinator website - Hacker News
console.log('Loading function')
var scraperjs = require('scraperjs')
// var AWS = require('aws-sdk')
var result
scraperjs.StaticScraper.create('https://news.ycombinator.com/')
    .scrape(function ($) {
      return $('.storylink').map(function () {
        return {'name': $(this).text(), 'link': $(this)[0].attribs.href}
      }).get()
    })
    .then(function (news) {
        // only getting the top 10 news of the Hacker News
      result = JSON.parse(JSON.stringify(news.slice(0, 10)))
    })

/* GET users listing. */
router.get('/articles', function (req, res, next) {
  res.json(result)
})

/* GET user by ID. */
router.get('/articles/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(articles[id])
  } else {
    res.sendStatus(404)
  }
})

export default router
