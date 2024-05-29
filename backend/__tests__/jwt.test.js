const jwt = require('jsonwebtoken');
const { verifyUser, verifySameUser, verifyAdmin, SignToken } = require('../Middlewares/jwt'); // Caminho para o seu módulo
const sinon = require('sinon'); // Para mockar funções assíncronas
const { User } = require('../Models/index'); // Caminho para o seu modelo User

// Mockar o módulo jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  decode: jest.fn(),
  verify: jest.fn(),
}));

// Mockar o modelo User
jest.mock('../Models/index', () => ({
  User: {
    findByPk: jest.fn(),
  },
}));

describe('JWT Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  describe('verifyUser', () => {
    it('should proceed if token is valid', async () => {
      // Configuração do teste
      const req = {
        headers: {
          authorization: 'Bearer mocked-token',
        },
      };
      const res = {};
      const next = sinon.stub();

      // Simula a resposta do jwt.verify
      jwt.verify.mockResolvedValue(null);

      // Chama a função verifyUser
      await verifyUser(req, res, next);

      // Verifica se next foi chamado
      sinon.assert.called(next);
    });

    // Adicione mais testes conforme necessário...
  });

  // Repita o processo acima para verifySameUser e verifyAdmin

  describe('SignToken', () => {
    it('should generate a valid token', async () => {
      const userId = '123';
      const expectedPayload = { id: userId };

      // Configura a função sign para retornar um token fictício
      jwt.sign.mockReturnValue('mocked-token');

      const token = await SignToken(userId);

      expect(jwt.sign).toHaveBeenCalledWith(expectedPayload, process.env.JWT_Secret);
      expect(token).toEqual('mocked-token');
    });
  });
});
