const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      name: "BTN News",
      type: "tv",
      stream: "https://tv.btnrwanda.com:3086/live/btnlive.m3u8"
    },
    {
      name: "Radio Rwanda",
      type: "radio",
      stream: "https://example.com/radio.mp3"
    }
  ]);
});

module.exports = router;