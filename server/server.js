const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './dist')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(`server connection error: ${err}`);
  } else {
    console.log(`Connected to server. Listening on ${PORT}`);
  }
});
