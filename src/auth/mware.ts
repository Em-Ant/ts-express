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
      return res.status(401).json({ message: 'invalid Authorization header' });

    const { name, permissionLevel, keyId } = await service.verify(token);

    if (permissionLevel < level) {
      return res.status(403).json({ message: 'Forbidden' });
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
    return res.status(401).json({ message: e.message });
  }
};

export default tokenValidatorFactory;
