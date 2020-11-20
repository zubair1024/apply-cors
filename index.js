require("dotenv").config();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 80;

let whitelist = [];
if (process.env.WHITELIST && process.env.WHITELIST.length) {
  whitelist = process.env.WHITELIST.split(",");
}

const cors_proxy = require("cors-anywhere");
cors_proxy
  .createServer({
    originWhitelist: whitelist,
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"],
  })
  .listen(port, host, function () {
    console.log("Running on " + host + ":" + port);
  });
