import sequelize from "./sequelize.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la BD ✅");

    await sequelize.sync(); // crea tablas si no existen
  } catch (error) {
    console.error("Error:", error);
  }
})();
