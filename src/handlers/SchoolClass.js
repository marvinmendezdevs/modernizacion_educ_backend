import { Op } from "sequelize";
import { Schools, Users } from "../config/sequelize.js";

export default class SchoolClass {
  static async getSchools(req, res) {
    let { page = 1, search = null, limit = 10 } = req.query;

    // Asegurar que page y limit sean números
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const where = {};

    // Solo aplicar filtro si viene search
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } }, // busca en nombre
        { code: { [Op.iLike]: `%${search}%` } }, // busca en código
      ];
    }

    const schools = await Schools.findAndCountAll({
      where,
      limit,
      offset,
    });

    return res.status(201).json(schools);
  }

  static async getSchool(req, res) {
    const { code } = req.params;

    try {
      const school = await Schools.findOne({
        where: { code }, // 👈 filtro en la tabla de escuelas
        include: [
          {
            model: Users,
            through: { attributes: [] },
          },
        ],
      });

      if (!school) {
        return res.status(404).json({ error: "Escuela no encontrada" });
      }

      res.json(school);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al consultar la escuela" });
    }
  }
}
