//터미널에서 node라고 입력 후
//require('crypto').randomBytes(64).toString('hex')를 입력하면
//랜덤숫자가 출력됨

// import corsOptions from 'config/corsOptions';
// import logger from 'morgan';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { corsOptions } from './config/corsOptions';
import { logger } from './middleware/logEvents';
import { errorHandler } from './middleware/errorHandler';
import { verifyJWT } from './middleware/verifyJWT';
import { credentials } from './middleware/credentials';
//13. refreshTokenController를 만든다
//14.그리고 쿠키파서를 임포트 한다.
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import rootRouter from './router/rootRouter';
import employeeRouter from './router/employeeRouter';
import registerRouter from './router/registerRouter';
import authRouter from './router/authRouter';
import logoutRouter from './router/logoutRouter';
import refreshTokenRouter from './router/refreshTokenRouter';
import usersRouter from './router/usersRouter';

const app = express();
dotenv.config();

//순서조심
// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', rootRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
//refresh 여기 라우터에서는 리프레쉐 토큰을 갖고 있는 쿠키를 받는다. 이것은 새로운 엑세스토큰을 발행한다.
//순서 조심
app.use('/refresh', refreshTokenRouter);
app.use('/logout', logoutRouter);

//12.미들웨어는 순서대로 실행하는데, 이 미들웨어는 반드시 유효검사를 실행해야 한다.그다음의 임플로이어 관련 작업을 진행할 수 있다.
app.use(verifyJWT);
app.use('/employees', employeeRouter);
app.use('/users', usersRouter);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

export default app;
