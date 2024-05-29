const bcrypt = require('bcrypt');
const { createHash, compareHash } = require('../Middlewares/bcrypt'); // Atualize o caminho conforme necessário

// Mockar o bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockImplementation((password, saltRounds) =>
    Promise.resolve(`mocked-hash-${password}-${saltRounds}`)
  ),
  compare: jest.fn().mockImplementation((plainText, hash) =>
    Promise.resolve(plainText === hash)
  ),
}));

describe('Hash Utils Module', () => {
  describe('createHash', () => {
    it('should create a hash from the given string', async () => {
      const testString = 'password123';
      const result = await createHash(testString);
      
      expect(typeof result).toBe('string'); // Verifica se o resultado é uma string
      expect(bcrypt.hash).toHaveBeenCalledWith(testString, expect.any(Number)); // Verifica se bcrypt.hash foi chamado corretamente
    });
  });

  describe('compareHash', () => {
    it('should correctly compare a plain password with a hashed password', async () => {
      const testString = 'password123';
      const testHash = 'mocked-hash-' + testString + '-10'; // Constrói um hash fictício para teste
      
      const result = await compareHash(testHash, testString);
      
      expect(result).toBe(true); // Espera que a comparação retorne verdadeiro
      expect(bcrypt.compare).toHaveBeenCalledWith(testString, testHash); // Verifica se bcrypt.compare foi chamado corretamente
    });
  });
});
