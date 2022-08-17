import connection from '../databases/postgres.js';
import userSchema from '../schemas/userRegisterSchema.js';

async function validateNewUser(request, response, next) {
  const newUser = request.body;

  const validate = userSchema.validate(newUser, { abortEarly: false });
  const { error } = validate;

  if (error) {
    const errors = error.details.map(err => err.message);
    return response.status(400).send(errors);
  }

  try {
    const { rows: users } = await connection.query('SELECT * FROM users');

    const user = users.some(user => user.email === newUser.email);

    if (user) return response.sendStatus(409);

    next();
  } catch {
    response.status(500).send('erro ao inserir user');
  }
}

export default validateNewUser;
