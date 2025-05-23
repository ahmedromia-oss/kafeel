import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(private configService:ConfigService){};
  private client: Redis;

  onModuleInit() {
    this.client = new Redis({
      host: this.configService.get<string>('Redishost'),
      port: Number(this.configService.get<string>('Redisport')) || 6379,
     
    });
  }

  onModuleDestroy() {
    this.client.quit();
  }
  a

  async set(key: string, value: string, ttlSeconds?: number): Promise<'OK'> {
    if (ttlSeconds) {
      
      return this.client.set(key, value, 'EX', ttlSeconds);
    }
    return this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }
}
