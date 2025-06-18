// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"


Sentry.init({
  dsn: "https://795f20523ab93a0f475d0a91a7cf59f7@o4509517722812416.ingest.us.sentry.io/4509517726941184",

  integrations:[
         Sentry.mongooseIntegration()
  ],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});