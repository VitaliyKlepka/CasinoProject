import * as winston from 'winston';
import { Injectable, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LokiTransportOptions } from './types';

const LokiTransport = require('winston-loki');

@Injectable()
export class AppLoggerService implements LoggerService {

  private logger: winston.Logger

  constructor(
    private readonly configService: ConfigService
  ) {
    const isProd = this.configService.get<boolean>('isProduction')
    const lokiTransportConfig = this.configService.get<LokiTransportOptions>('lokiTransportConfig')
    const logLevel = this.configService.get<string>('logLevel')
    const logConfig = {
      level: logLevel,
      transports: [
        (isProd ? new LokiTransport(lokiTransportConfig!) : new winston.transports.Console()),
      ],
    }
    this.logger = winston.createLogger(logConfig);
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.log('info', message, optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]) {
    this.logger.error(message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message, optionalParams);
  }
}

