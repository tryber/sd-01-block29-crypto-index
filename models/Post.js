module.exports = (sequelize, DataType) => {
  const { STRING } = DataType;
  const Post = sequelize.define('Post', {
    email: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Campos inválidos"
        },
        isEmail: true,
      },
    },
    senha: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Campos inválidos"
        },
        isNumeric: true,
        len: {
          args: [6, 6],
          msg: 'Esse camnpo deve ter 6 caracteres'
        }
      },
    },
  });
  return Post;
};
