const app = require('./app.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(`server connection error: ${err}`);
  } else {
    console.log(`Connected to server. Listening on ${PORT}`);
  }
});
