const app = require('./app');
const mongoose = require('mongoose');

const dbb = 'mongodb+srv://harry:test@cluster0.rc51g90.mongodb.net/?retryWrites=true&w=majority';
mongoose
    .connect(dbb)
    .then(() =>
        app.listen(3000, () => {
          console.log('Database connection successful');
        }),
    )
    .catch(error => {
      console.log('Database connection fail', error.message);
      process.exit(1);
    });

