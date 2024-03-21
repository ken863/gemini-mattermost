module.exports = (app, axios) => {
  const UIActions = require('./uiActions');
  const uiActions = new UIActions();

  const RateLimit = require('express-rate-limit');
  const limiter = RateLimit({
    windowMs: 1*60*1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  });

  app.use(limiter);

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
      case '/ask':
        uiActions.askGemini(req, res, axios);
        break;
      default:
        break;
    }
  });
}