import ConnectRedis from 'connect-redis';
import session from 'express-session';
import { RedisModule, RedisModuleOptions, RedisService } from 'nestjs-redis';
import { NestSessionOptions, SessionModule } from 'nestjs-session';

const RedisStore = ConnectRedis(session);

export const Session = SessionModule.forRootAsync({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (): RedisModuleOptions => {
        return { host: 'redis' };
      },
    }),
  ],
  inject: [RedisService],
  useFactory: (redisService: RedisService): NestSessionOptions => {
    const redisClient = redisService.getClient();
    const store = new RedisStore({ client: redisClient as any });
    return {
      session: {
        store,
        secret: 'session-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: true,
          maxAge: 1 * 60 * 1000,
          sameSite: 'none',
        },
      },
    };
  },
});
