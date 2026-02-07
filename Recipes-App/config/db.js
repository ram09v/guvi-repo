const mongoose = require('mongoose');

module.exports = function connectDB() {
  const {
    NODE_ENV,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DB_PARAMS
  } = process.env;

  const buildFromParts = () => {
    if (!DB_USERNAME || !DB_PASSWORD || !DB_HOST || !DB_NAME) return null;
    const user = encodeURIComponent(DB_USERNAME);
    const pass = encodeURIComponent(DB_PASSWORD);
    const params = DB_PARAMS ? `?${DB_PARAMS}` : '';
    return `mongodb+srv://${user}:${pass}@${DB_HOST}/${DB_NAME}${params}`;
  };

  const atlasURI = buildFromParts();
  const localURI = 'mongodb://localhost:27017/recipes_app';

  const dbURI = NODE_ENV === 'production' ? atlasURI : localURI;

  if (!dbURI) {
    throw new Error('No MongoDB URI configured. Set MONGO_URI or DB_USERNAME/DB_PASSWORD/DB_HOST/DB_NAME.');
  }

  mongoose.connect(dbURI)
    .then(() => console.log('Mongoose connected to', dbURI))
    .catch(err => console.error('Mongoose connection error:', err));

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
};