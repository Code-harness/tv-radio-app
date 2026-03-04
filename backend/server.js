const express = require("express");
const cors = require("cors");

const channelRoutes = require("./routes/channelRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/channels", channelRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});