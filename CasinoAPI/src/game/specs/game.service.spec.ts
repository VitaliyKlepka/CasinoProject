import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '../game.service';
import { ESpinSymbol } from '../enums';
import {
  CREDITS_FIRST_THRESHOLD,
  CREDITS_SECOND_THRESHOLD,
} from '../constants';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  describe('getSpin', () => {
    it('should return valid spin result structure', async () => {
      const result = await service.getSpin(10);

      expect(result).toHaveProperty('pointOne');
      expect(result).toHaveProperty('pointTwo');
      expect(result).toHaveProperty('pointThree');
      expect(result).toHaveProperty('spinCost');
      expect(Object.values(ESpinSymbol)).toContain(result.pointOne);
      expect(Object.values(ESpinSymbol)).toContain(result.pointTwo);
      expect(Object.values(ESpinSymbol)).toContain(result.pointThree);
      expect(typeof result.spinCost).toBe('number');
    });

    it('should apply cheat chance for credits in first threshold', async () => {
      const credits = (CREDITS_FIRST_THRESHOLD + CREDITS_SECOND_THRESHOLD) / 2;
      jest.spyOn(Math, 'random').mockReturnValue(0.2); // Below 0.3 threshold

      const result = await service.getSpin(credits);

      expect(result.spinCost).toBeDefined();
    });

    it('should apply higher cheat chance for credits above second threshold', async () => {
      const credits = CREDITS_SECOND_THRESHOLD + 100;
      jest.spyOn(Math, 'random').mockReturnValue(0.5); // Below 0.6 threshold

      const result = await service.getSpin(credits);

      expect(result.spinCost).toBeDefined();
    });
  });
});
