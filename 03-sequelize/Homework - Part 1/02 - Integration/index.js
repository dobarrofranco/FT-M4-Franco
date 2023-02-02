const server = require('./app');
const { sequelize } = require('./database/DB_connection');
const saveAPIdata = require('./routers/apiToDB');

sequelize
   .sync({ force: true })
   .then(() => {
      saveAPIdata();
      console.log('Information was saved successfully');
   })
   .then(() =>
      server.listen(3001, () => console.log('Server raised in port 3001'))
   )
   .catch((err) => {
      console.log(err.message);
   });
