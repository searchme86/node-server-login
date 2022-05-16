import mongoose from 'mongoose';

export const connectToDB = (cb) => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cb();
    console.log('Db connect successful');
  } catch (error) {
    cb(error);
    console.log('Mongoose Connection Error!', error);
  }
};

const handleOpen = () => console.log('Connected to DB!');
const handleError = (error) => console.log('DB Error', error);

const db = mongoose.connection;

db.on('error', handleError);
db.once('open', handleOpen);
