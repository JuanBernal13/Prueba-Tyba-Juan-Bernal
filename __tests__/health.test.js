const HealthController = require('../controllers/healthController');

describe('HealthController', () => {
  let healthController;
  let req, res;

  beforeEach(() => {
    healthController = new HealthController();
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  describe('checkHealth', () => {
    it('Retorno de respuesta exitosa con up', async () => {
      await healthController.checkHealth(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        status: 'up',
        message: 'Servicio desplegado correctamente',
        timestamp: expect.any(String)
      });
    });

    it('Escenario de error', async () => {
      res.json
        .mockImplementationOnce(() => {
          throw new Error('Test error');
        })
        .mockImplementationOnce((data) => data);

      await healthController.checkHealth(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledTimes(2);
      expect(res.json).toHaveBeenLastCalledWith({
        success: false,
        status: 'down',
        message: 'Error en el servicio',
        error: 'Test error',
        timestamp: expect.any(String)
      });
    });
  });
}); 