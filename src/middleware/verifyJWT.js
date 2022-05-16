import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//4. authController를 작성하도 다음 코드를 입력한다.
export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  // console.log('[*]-verifyjwt에서 token', token);

  //newly added
  const decoded = jwt.decode(token);
  console.log('[*3.verifyJWT] decoded', decoded);
  let d1 = new Date(parseInt(decoded.iat) * 1000);
  let d2 = new Date(parseInt(decoded.exp) * 1000);

  console.log('[*3.verifyJWT] decoded.iat', d1);
  console.log('[*3.verifyJWT] decoded.exp', d2);
  //newly added

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log('----에러가 발생함----');
      console.log(err.message);
      console.log(err.expiredAt.toISOString());
      console.log(err.name);
      console.log(err.stack);
      return res.sendStatus(403); //invalid token
    }
    console.log('이상없이 진행됨');
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
  //여기까지 작성하고
  //5. employeeRouter로 이동한다.
};
