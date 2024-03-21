/*
    op-mattermost provides an integration for Mattermost and Open Project.
    Copyright (C) 2020 to present , Girish M

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>

*/

require('./message');

module.exports = (app, axios) => {

  const mmURL = process.env.MM_URL;
  const intURL = process.env.INT_URL;

  const UIActions = require('./uiActions');
  const uiActions = new UIActions(mmURL, intURL);

  const RateLimit = require('express-rate-limit');
  const limiter = RateLimit({
    windowMs: 1*60*1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  });

  app.use(limiter);

  app.get('/', (req, res) => {
    res.send("Hello there! Good to see you here :) We don't know what to show here yet!").status(200);
  });

  app.post('/', (req, res) => {
    const {command, token, text} = req.body;

    if(token === process.env.MATTERMOST_SLASH_TOKEN) {
      console.log("Request Body to / ", JSON.stringify(req.body, null, 2));
      if(command === "/translate") {
        switch (text) {
          case 'image':
            break;
          default:
            uiActions.translateFromText(req, res, axios);
            break;
        }
      }
      else {
        res.send("*I don't understand ", command, ". Let's try again...* \n `/translate`").status(500);
      }
    }
    else {
      res.send("Invalid slash token").status(400);
    }
  });
}