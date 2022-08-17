import connection from '../databases/postgres.js';

export async function registerUser(request, response) {
  const newUser = request.body;
  try {
    await connection.query(
      `INSERT INTO users (email, name, image, password) VALUES
      ('${newUser.email}',
      '${newUser.name}',
      '${newUser.image}',
      '${newUser.password}');`
    );

    return response.sendStatus(201);
  } catch {
    return response.status(500).send('erro ao inserir userwda');
  }
}

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
