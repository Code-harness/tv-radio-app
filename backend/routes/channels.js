const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      name: "BBC News",
      type: "tv",
      stream: "https://example.com/bbc.m3u8"
    },
    {
      name: "Radio Rwanda",
      type: "radio",
      stream: "https://example.com/radio.mp3"
    }
  ]);
});

module.exports = router;