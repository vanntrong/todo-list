import configuration from '@/config/configuration';
import { Logger, Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

export const DB_MODULE_TOKEN = 'DB_MODULE_TOKEN';

@Module({
  providers: [
    {
      provide: DB_MODULE_TOKEN,
      useFactory: async (): Promise<Db> => {
        try {
          const config = configuration();
          const logger = new Logger('DB');
          logger.log(
            'Connecting to DB...' +
              `mongodb://${config.DB.HOST}:${config.DB.PORT}`,
          );
          const client = await MongoClient.connect(
            `mongodb://${config.DB.USERNAME}:${config.DB.PASSWORD}@${config.DB.HOST}:${config.DB.PORT}`,
          );

          logger.log('Connected to database');

          return client.db(config.DB.NAME);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
  ],
  exports: [DB_MODULE_TOKEN],
})
export class DBModule {}
