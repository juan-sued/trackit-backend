import connection from '../databases/postgres.js';
import userLoginSchema from '../schemas/userLoginSchema.js';

async function validateLoginUser(request, response, next) {
  const LoginUser = request.body;

  const validate = userLoginSchema.validate(LoginUser, { abortEarly: false });
  const { error } = validate;

  if (error) {
    const errors = error.details.map(err => err.message);
    return response.status(400).send(errors);
  }

  try {
    const { rows: idUser } = await connection.query(
      `SELECT users.id FROM users WHERE email = $1;`,
      [LoginUser.email]
    );
    if (idUser.length <= 0) return response.status(404).send('Email não registrado');

    //================

    const { rows: session } = await connection.query(
      `SELECT * FROM sessions WHERE id = $1`,
      [idUser[0].id]
    );
    if (session.length > 0) return response.status(409).send('Usuário online');

    //==========

    const status = Date.now();
    console.log(idUser, status);
    await connection.query(
      `INSERT INTO sessions (id, "lastStatus") VALUES (${idUser[0].id}, ${status}));`
    );
    //===============

    next();
  } catch {
    response.status(500).send('erro ao inserir userasdas');
  }
}

export default validateLoginUser;
