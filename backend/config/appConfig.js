let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: 'mongodb+srv://keshav:vblWH1yBJFgsyFLY@cluster0.btsps.mongodb.net/chat-application?retryWrites=true&w=majority'
  }
appConfig.apiVersion = '/api/v1';

module.exports = appConfig;