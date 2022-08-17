import connection from '../databases/postgres.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function registerUser(request, response) {
  const { email, name, image, password } = request.body;
  const passwordCrypted = bcrypt.hashSync(password, 10);
  try {
    await connection.query(
      `INSERT INTO users (email, name, image, password) VALUES
      ('${email}',
      '${name}',
      '${image}',
      '${passwordCrypted}');`
    );

    return response.sendStatus(201);
  } catch {
    return response.status(500).send('erro ao inserir user');
  }
}

export async function loginUser(request, response) {
  const { user } = response.locals;

  const secretKey = process.env.JWT_SECRET;
  const data = { userId: user[0].id };

  const settings = { expiresIn: 60 * 60 * 24 * 30 };

  const token = jwt.sign(data, secretKey, settings);

  return response.status(200).send({ Authorization: `Baerer ${token}` });
}

//
//
//
//
//
//
//
//
//

//
//
export async function getUsers(request, response) {
  const { cpf } = request.query;
  const { id } = request.params;

  const queryBasic = `SELECT * FROM Users`;
  let query = queryBasic;
  console.log('aaa');
  try {
    if (!!cpf) {
      query = queryBasic + ` WHERE Users.cpf ILIKE '${cpf}%';`;
    } else if (!!id) {
      query = queryBasic + ` WHERE Users.id = ${id};`;
    }
    console.log(query);
    const { rows: User } = await connection.query(query);
    if (!User) return response.sendStatus(404);

    return response.status(200).send(User);
  } catch {
    return response.sendStatus(500);
  }
}

export async function putCustomers(request, response) {
  const newCustomer = request.body;
  const { id } = request.params;
  try {
    await connection.query(
      `UPDATE customers SET name = '${newCustomer.name}', phone = '${newCustomer.phone}', cpf = '${newCustomer.cpf}', birthday = '${newCustomer.birthday}' WHERE customers.id = ${id};`
    );
    return response.sendStatus(200);
  } catch {
    return response.status(500).send('erro ao atualizar customers');
  }
}
