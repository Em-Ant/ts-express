import { TokenService } from './Token';

import { Request, Response, NextFunction } from 'express';
import { PermissionLevel } from './Key';

const tokenValidatorFactory = (service: TokenService) => (
  level: PermissionLevel = PermissionLevel.API_USAGE
) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const [type, token] = (req.get('Authorization') ?? '').split(' ');
    if (type !== 'Bearer')
      return next({ status: 401, message: 'invalid Authorization header' });

    const { name, permissionLevel, keyId } = service.verify(token);

    if (permissionLevel < level) {
      return next({ status: 403, message: 'forbidden' });
    }

    req.context = {
      user: {
        name,
        permissionLevel,
        keyId,
      },
    };

    return next();
  } catch (e) {
    return next({ status: 401, message: e.message });
  }
};

export default tokenValidatorFactory;
