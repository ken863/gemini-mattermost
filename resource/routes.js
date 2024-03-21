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
    // console.log("Request Body to / ", JSON.stringify(req.body, null, 2));

    switch (command) {
      case '/vn':
        uiActions.translateIntoVNFromText(req, res, axios);
        break;
      case '/jp':
        uiActions.translateIntoJPFromText(req, res, axios);
        break;
      default:
        break;
    }
  });
}