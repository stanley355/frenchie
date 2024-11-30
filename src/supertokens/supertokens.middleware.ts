import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { SupertokensService } from './supertokens.service';

@Injectable()
export class SupertokensMiddleware implements NestMiddleware {
  constructor(private readonly supertokensService: SupertokensService) {}
  async use(req: any, res: any, next: () => void) {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        throw new UnauthorizedException();
      }

      console.log("Token:", authorization);
      const sessionVerification =
        await this.supertokensService.verifySession(authorization);
      console.log("Session verification: ", sessionVerification);
      if (sessionVerification.status !== 'OK') {
        throw new UnauthorizedException(sessionVerification.message);
      }
      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
