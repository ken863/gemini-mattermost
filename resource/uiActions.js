class UIactions {
  constructor() {
    this.moment = require('moment');

    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_ACCESS_TOKEN);

    // For text-only input, use the gemini-pro model
    this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async translateIntoVNFromText(req, res, axios) {
    const msg = "Dịch sang tiếng việt: " + req.body.text;
    this.gemniAiAction(req, msg, res);
  }

  async translateIntoJPFromText(req, res, axios) {
    const msg = "Dịch sang tiếng nhật: " + req.body.text;
    this.gemniAiAction(req, msg, res);
  }

  async askGemini(req, res, axios) {
    const msg = req.body.text;
    this.gemniAiAction(req, msg, res);
  }

  async gemniAiAction(req, msg, res) {
    try {
      const chat = this.model.startChat();
      const result = await chat.sendMessage(msg);
      const response = await result.response;
      const responsetext = response.text();
      res.send(req.body.text + "\n\n>" + responsetext);
    } catch (err) {
      console.log(err);
      res.send("Cannot process this command").status(500);
    }
  }
}

module.exports = UIactions;