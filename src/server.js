const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const https = require('https')
const http = require('http')
const cookie = require('cookie-parser')
require('dotenv').config({ path: path.join(__dirname, ".env")})

const PORT = process.env.PORT

/* SETTINGS */

app.set('view engine', "ejs")


/* Middlewares */
app.use(cookie())

function ensureSecure(req, res, next){
  if(req.secure){
    // OK, continue
    return next();
  };
  // handle port numbers if you need non defaults
  // res.redirect('https://' + req.host + req.url); // express 3.x
  res.redirect('https://' + req.hostname + req.url); // express 4.x
}





app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(path.join(__dirname, "public")))
app.set('views', path.join(__dirname, "views"))

/* Routes */

const RoutesPath = path.join(__dirname, "routes")

fs.readdir(RoutesPath, (err, files) => {
    for(let file of files){
        const filePath = path.join(__dirname, 'routes', file)
        const route = require(filePath)
        if(route.path && route.router){
            app.use(route.path, route.router)
        }
    }
})

http.createServer(app).listen(8080)
