// const express = require('express');
// const next = require('next');
/* external import */
const mongoose = require("mongoose");

/* internal imports */
const app = require("./app");
const consoleMessage = require("./utils/console.util");

/* Constants and Vars */
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
// const nextApp = next({dev})
// const handle = nextApp.getRequestHandler()

/* database connection */
// nextApp.prepare().then(() => {
    /** */
    // app.get('*', (req, res) => {
    //   return handle(req, res)
    // })
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.ATLAS_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => consoleMessage.successMessage("DB connection established."))
    .catch((error) => consoleMessage.errorMessage(error.message));
    // 

  /* establish server port */
  app.listen(port, (err) => {
    if (err) throw err;
    consoleMessage.successMessage(`App listening on ${process.env.PORT}.`);
  });
// }).catch((ex) => {
//   // console.error(ex.stack)
//   // process.exit(1)
//   console.log('error starting server')
// })


