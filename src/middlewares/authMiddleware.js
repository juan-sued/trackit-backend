import jwt from 'jsonwebtoken';

async function authUser(request, response, next) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');
  // o ? significa que é opcional, ja que o token pode vir null
  const secretKey = process.env.JWT_SECRET;
  if (!token)
    return response
      .status(400)
      .send('Token ou Id inválido, não autorizado ou inexistente');

  try {
    jwt.verify(token, secretKey);

    next();
  } catch {
    response.status(500).send('Erro ao validar token');
  }
  //diz que pode continuar o fluxo
}

export default authUser;
