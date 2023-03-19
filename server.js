const app = require('./app');

const port = 5000;
app.listen(port, () => { console.log(`listening on http://127.0.0.1:${port}`) });
console.log(`listening on http://127.0.0.1:${port}/api/v1/movies`);