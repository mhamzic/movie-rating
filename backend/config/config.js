const config = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "paragonfullstackmistral",
  MONGO:
    process.env.MONGO ||
    "mongodb+srv://Paragon004:!400nogaraP$@cluster0.3dvou.mongodb.net/movieRating?retryWrites=true&w=majority",
};

module.exports = config;
