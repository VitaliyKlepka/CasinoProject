import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthSession } from '../entities/auth_session.entity';
import { Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let repository: Repository<AuthSession>;

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: getRepositoryToken(AuthSession),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    repository = module.get<Repository<AuthSession>>(
      getRepositoryToken(AuthSession),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('init', () => {
    const mockAccount: Account = {
      id: 1,
      email: 'test@test.com',
      isActive: true,
      updated_at: new Date(),
      created_at: new Date(),
    };
    const mockDeviceId = 'test-device-id';
    const mockToken = 'test-token';

    it('should return existing session if valid', async () => {
      const mockExistingSession = {
        payload: mockToken,
      };

      mockRepository.findOne.mockResolvedValue(mockExistingSession);

      const result = await service.init(mockAccount, mockDeviceId);

      expect(result).toEqual({ token: mockToken });
      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockJwtService.signAsync).not.toHaveBeenCalled();
    });

    it('should create new session if no valid session exists', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockJwtService.signAsync.mockResolvedValue(mockToken);
      mockRepository.save.mockImplementation((data) => Promise.resolve(data));

      const result = await service.init(mockAccount, mockDeviceId);

      expect(result).toEqual({ token: mockToken });
      expect(mockJwtService.signAsync).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('closeSession', () => {
    const mockDeviceId = 'test-device-id';

    it('should close existing session successfully', async () => {
      const mockSession = { id: 1 };
      mockRepository.findOne.mockResolvedValue(mockSession);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.closeSession(mockDeviceId);

      expect(result).toBe(true);
      expect(mockRepository.update).toHaveBeenCalledWith(
        mockSession.id,
        expect.objectContaining({ expires_at: expect.any(Date) }),
      );
    });

    it('should return false when no active session found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.closeSession(mockDeviceId);

      expect(result).toBe(false);
    });

    it('should return false when update fails', async () => {
      const mockSession = { id: 1 };
      mockRepository.findOne.mockResolvedValue(mockSession);
      mockRepository.update.mockResolvedValue({ affected: 0 });

      const result = await service.closeSession(mockDeviceId);

      expect(result).toBe(false);
    });
  });
});
