import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
          // where to read token from:
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          // must match secret in JwtModule
          secretOrKey: 'SUPER_SECRET_KEY_CHANGE_ME',
        });
      }
    
      async validate(payload: { sub: string; email: string }) {
        // whatever you return here becomes request.user
        return { userId: payload.sub, email: payload.email };
      }


}