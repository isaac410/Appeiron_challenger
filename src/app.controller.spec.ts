import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();
  });

  describe('health', () => {
    it('should return "health information object"', () => {
      const appController = app.get(AppController);
      expect(appController.checkHealth()).toBe({
        uptime: Number,
        message: 'OK',
        timestamp: String,
      });
    });
  });
});
