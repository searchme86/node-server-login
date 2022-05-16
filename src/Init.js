import { connectToDB } from './db';
// import './models/tour';
// import './models/user';

import app from './Server';

const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`server is listening on ${PORT}`);
};

connectToDB((err) => {
  if (!err) {
    app.listen(PORT, handleListening);
  }
});
