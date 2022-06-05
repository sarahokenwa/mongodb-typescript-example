"use strict";
exports.__esModule = true;
//import express from "express";
var express = require("express");
var database_service_1 = require("./services/database.service");
var user_router_1 = require("./routes/user.router");
var app = express();
var port = 8080; // default port to listen
// ** TODO ** Replace this code with a call to your games router class to handle all calls to /games endpoint
/*app.get("/", (req, res) => {
    res.send("Hello world!");
});*/
// start the Express server
/*app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);

    // ** TODO ** Call to Game Service to initiate connection
});*/
(0, database_service_1.connectToDatabase)()
    .then(function () {
    app.use("/user", user_router_1.userRouter);
    app.listen(port, function () {
        console.log("Server started at http://localhost:".concat(port));
    });
})["catch"](function (error) {
    console.error("Database connection failed", error);
    process.exit();
});
