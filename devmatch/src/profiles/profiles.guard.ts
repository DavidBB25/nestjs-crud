import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ProfilesGuard implements CanActivate {
  // this func runs every time a req hits a route protected by this guard
  canActivate(context: ExecutionContext) {
    // context holds all the details about the current execution
    // getRequest gives a req object
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('X-API-KEY'); // grab key from header X-API-KEY

    if (apiKey !== 'admin') {
      return false; // access denied
    }
    return true; // access granted
  }
}
