// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/produce.db3'
    },
    useNullAsDefault: true // for SQLite only
  },
// for production server (heroku?)
  production: {
    client: 'sqlite3',
    connection: {
      filename: './data/veggies.db3'
    },
    useNullAsDefault: true // for SQLite only
  },

};
