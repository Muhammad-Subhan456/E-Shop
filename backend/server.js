const app = require("./app");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down The Server for Handling uncaughtException`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// create server

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is Running on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down The Server for Handling unhandledRejection`);

  server.close(() => {
    process.exit(1);
  });
});
