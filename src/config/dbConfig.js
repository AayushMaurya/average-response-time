import Sequelize from "sequelize";

const databaseConfig = {
    database: "event_hawk", // db name
    username: "root",
    password: "Aayush",
    host: "localhost", // or your database host
    dialect: 'mysql', // or your database dialect (e.g., 'mysql', 'postgres', 'sqlite')
    logging: true // make it true to logg the queries that sequqlize perform on console
  };

  const sequelize = new Sequelize(databaseConfig);

//   checking connection

sequelize.authenticate().then(() => {
    console.log("Conncetion has been established successfully");
}).catch((error) => {
    console.error("Unable to connect to database: ", error);
});

// Sync the models with the database (create tables if they don't exist)

sequelize.sync({alter: true}) // Use { alter: true } to create tables if they don't exist
  .then(() => {
    console.log('Database and tables are synchronized.');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

export default sequelize;