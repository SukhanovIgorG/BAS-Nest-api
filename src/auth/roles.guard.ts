import { CanActivate, ExecutionContext, Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./auth-roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
      const authHeader = req.headers.authorization
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]
      if (!requiredRoles) {
        throw new NotFoundException({ message: 'Роль пользователя не найдена' })
      }
      const user = this.jwtService.verify(token);
      req.user = user
      if (user.roles.some((role: { value: string }) => requiredRoles.includes(role.value))) {
        return true;
      } else {
        throw new ForbiddenException({ message: 'Нет прав на данную операцию' })
      }
    } catch (e) {
      throw new ForbiddenException({ message: 'Нет прав на данную операцию' })
    }
  }
}