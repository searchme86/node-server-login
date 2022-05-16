import jwt from 'jsonwebtoken';
import User from '../models/User';

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log('[*handleRefreshToken]req.cookies', req.cookies);
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  console.log('[!!!]refreshToken', refreshToken);

  const foundUser = await User.findOne({ refreshToken });

  console.log('[!!!]foundUser', foundUser);

  if (!foundUser) return res.sendStatus(403); //Forbidden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      console.log('err.message', err.message);
      return res.sendStatus(403);
    }
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '40s' }
    );
    res.json({ roles, accessToken });
  });
};
