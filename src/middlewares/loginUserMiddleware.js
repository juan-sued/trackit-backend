import connection from '../databases/postgres.js';
import userLoginSchema from '../schemas/userLoginSchema.js';
import bcrypt from 'bcrypt';

async function validateLoginUser(request, response, next) {
  const LoginUser = request.body;

  const validate = userLoginSchema.validate(LoginUser, { abortEarly: false });
  const { error } = validate;

  if (error) {
    const errors = error.details.map(err => err.message);
    return response.status(400).send(errors);
  }

  try {
    const { rows: user } = await connection.query(
      `SELECT users.id, users."password" FROM users WHERE email = $1;`,
      [LoginUser.email]
    );

    const passwordDecrypted = bcrypt.compare(LoginUser.password, user[0].password);

    if (user.length <= 0 || !passwordDecrypted)
      return response.status(400).send('Email ou Senha incorreto(s)!');

    response.locals.user = user;

    next();
  } catch {
    response.status(500).send('erro ao logar user');
  }
}

export default validateLoginUser;
