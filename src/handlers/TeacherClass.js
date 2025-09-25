import { Users } from "../config/sequelize.js"
import { Op } from "sequelize";

export default class TeacherClass {

    static async teachers(req, res) {
        let { page = 1, search = null, limit = 10 } = req.query;
        // Asegurar que page y limit sean números
        page = parseInt(page);
        limit = parseInt(limit);

        const offset = (page - 1) * limit;

        const where = {
            role: 1
        };

        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } }, // busca en nombre
                { email: { [Op.iLike]: `%${search}%` } }, // busca en código
            ];
        }

        try {
            const teachersList = await Users.findAndCountAll({
                where,
                limit,
                offset,
            });

            res.json(teachersList);
        } catch (error) {
            console.log(error)
        }
    }
}