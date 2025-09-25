import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgresql://modernizacion_educativa_user:gycOPvgmm1xovZbZvkjOkueXX3ORPIRJ@dpg-d39em6emcj7s73f18h60-a.oregon-postgres.render.com/modernizacion_educativa",
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// Definir modelo
export const Schools = sequelize.define(
  "Schools",
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "school_institutions",
    timestamps: false,
  }
);

export const Users = sequelize.define(
  "Users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
    },
    lxp_access: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export const UserSchoolInstitutions = sequelize.define(
  "UserSchoolInstitutions",
  {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    school_institution_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    track: {
      type: DataTypes.STRING,
    },
    subtrack: {
      type: DataTypes.STRING,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user_school_institutions",
    timestamps: false,
  }
);

// Un usuario puede pertenecer a muchas escuelas
Users.belongsToMany(Schools, {
  through: UserSchoolInstitutions,
  foreignKey: "user_id",
});

// Una escuela puede tener muchos usuarios
Schools.belongsToMany(Users, {
  through: UserSchoolInstitutions,
  foreignKey: "school_institution_id",
});


export default sequelize;
