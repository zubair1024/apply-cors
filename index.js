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
    // originBlacklist: originBlacklist,
    requireHeader: ["origin", "x-requested-with"],
    // checkRateLimit: checkRateLimit,
    removeHeaders: [
      "cookie",
      "cookie2",
      // Strip Heroku-specific headers
      "x-request-start",
      "x-request-id",
      "via",
      "connect-time",
      "total-route-time",
      // Other Heroku added debug headers
      // 'x-forwarded-for',
      // 'x-forwarded-proto',
      // 'x-forwarded-port',
    ],
    redirectSameOrigin: true,
    httpProxyOptions: {
      // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
      xfwd: false,
    },
  })
  .listen(port, host, function () {
    console.log("Running on " + host + ":" + port);
  });
