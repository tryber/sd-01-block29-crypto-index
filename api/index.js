const app = require('./server');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`ouvindo na porta http://localhost${PORT}!`));
