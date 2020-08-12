const { SnakeNamingStrategy } = require("typeorm-naming-strategies");
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, BUILD } = process.env;

module.exports = {
  type: "mongodb",

  url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.zoejr.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  entities: [Boolean(BUILD) ? "build/src/models/*.js" : "src/models/*.ts"],
  namingStrategy: new SnakeNamingStrategy(),
};
