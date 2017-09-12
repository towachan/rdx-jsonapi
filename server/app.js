var app = require("express")()
var bodyParser = require("body-parser")
var multer = require("multer")
var upload = multer()
var https = require("https")
var fs = require("fs")
var path = require("path")

var resData = {
  data: [
    {
      id: "1",
      type: "posts",
      attributes: {
        title: "First post"
      },
      relationships: {
        comments: {
          data: [
            {
              id: "5",
              type: "comments"
            }
          ]
        }
      }
    },
    {
      id: "2",
      type: "posts",
      attributes: {
        title: "Second post"
      },
      relationships: {
        comments: {
          data: [
            {
              id: "3",
              type: "comments"
            }
          ]
        }
      }
    }
  ],
  included: [
    {
      id: "3",
      type: "comments",
      attributes: {
        body: "first!"
      }
    },
    {
      id: "5",
      type: "comments",
      attributes: {
        body: "inane drivel"
      }
    }
  ]
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:7778")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Headers"
  )
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "POST,GET,HEAD,PATCH,DELETE")
  next()
})

app.post("/api/*", function(req, res) {
  res.send(resData)
})

app.patch("/api/*", function(req, res) {
  res.send(resData)
})

app.delete("/api/*", function(req, res) {
  res.send(resData)
})

app.get("/api/*", function(req, res) {
  res.send(resData)
})

app.listen(9999, function() {
  console.log("Dummy server is listening on port 9999!")
})
