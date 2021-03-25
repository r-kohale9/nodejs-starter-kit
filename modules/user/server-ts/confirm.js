import jwt from 'jsonwebtoken';

import settings from '@gqlapp/config';
// eslint-disable-next-line import/no-named-default
import { default as USER_ROUTES } from '@gqlapp/user-client-react/routes';

import User from './sql';

export default async (req, res, next) => {
  try {
    const token = Buffer.from(req.params.token, 'base64').toString();
    const result = jwt.verify(token, settings.auth.secret);

    await User.updateActive(result.identity.id, true);

    res.redirect(`${USER_ROUTES.emailVerified}`);
  } catch (e) {
    next(e);
  }
};
