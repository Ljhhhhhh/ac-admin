module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/ac',
  redis: {
    get host() {
      return 'localhost'
    },
    get port() {
      return 6379
    }
  },
}