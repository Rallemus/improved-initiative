/// <reference path="../typings/index.d.ts" />

import socketIO = require("socket.io");
import express = require("express");

import ConfigureAppInsights from "./configureappinsights";
import LaunchServer from "./launchserver";
import ConfigureRoutes from "./routes";
import ConfigureSockets from "./sockets";
import Library from "./library";
import { StatBlock } from "./statblock";

ConfigureAppInsights();

const statBlockLibrary = Library.FromFile<StatBlock>("ogl_creatures.json", "/statblocks/");
const playerViews = [];

const app = express();
const http = require("http").Server(app);

ConfigureRoutes(app, statBlockLibrary, playerViews);

const io = socketIO(http);
ConfigureSockets(io, playerViews);

LaunchServer(http);