const express = require('express');
const path = require('path');

const getTranslatedServer = lang => {
  const distFolder = path.join(
    process.cwd(),
    `dist/client-angular/server/${lang}`
  );
  const server = require(`${distFolder}/main.js`);
  return server.app(lang);
};

function run() {
  const port = process.env.PORT || 4200;

  // Start up the Node server
  const appFr = getTranslatedServer('ru');
  const appEn = getTranslatedServer('en-US');

  const server = express();
  server.use('/ru', appFr);
  server.use('/en', appEn);
  server.use('', appEn);

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
