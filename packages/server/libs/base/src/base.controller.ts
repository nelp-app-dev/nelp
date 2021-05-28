import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class BaseController {
  public logger: Logger;
  constructor(contextName: string, public client: ClientProxy) {
    this.logger = new Logger(contextName);
  }

  async onModuleInit() {
    await this.client.connect();
    setInterval(async () => {
      try {
        await this.client.emit('healthcheck', 'healthcheck').toPromise();
      } catch (err) {
        // Sending the message has failed, start recovery
        this.logger.error(err);
        process.exit(1);
      }
    }, 3000);
  }
}
