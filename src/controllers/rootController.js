import path from 'path';

export const rootController = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
};
