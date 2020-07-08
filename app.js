#!/usr/bin/env node

const properties = require('./src/utils/properties')
const app = require('./src/services/configurator');
const debug = require('debug')('openemp-api-configurator:server');
const http = require('http');
const express = require('express')
const walkRouter = require('./src/routes/walker')
const port = properties.port

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(properties.apiPath, walkRouter)

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

server.listen( port, (error, response) =>{
    console.log('Listening on port ' + server.address().port);
});

module.exports = server
