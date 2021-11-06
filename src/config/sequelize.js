import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL_DEV',
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      idle: 0,
      acquire: 6000
    }
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      idle: 0,
      acquire: 6000
    }
  },
  production: {
    use_env_variable: 'DATABASE_URL_PRO',
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      idle: 0,
      acquire: 6000
    },
    dialectOptions: {
      'ssl': true,
    }
  }
};
