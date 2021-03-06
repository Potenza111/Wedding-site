const pgp = require('pg-promise')();

// Get the values for these variables from configuration
const user = 'xwuosgcn';
const password = 'MSxw55_ELCmsrUpmL8pZaidA5JdPwbmc';
const host = 'otto.db.elephantsql.com';
const port = 5432;
const database = 'xwuosgcn';

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for("MyApp.db");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = (globalSymbols.indexOf(DB_KEY) > -1);
if (!hasDb) {
    global[DB_KEY] = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);
}

// Create and freeze the singleton object so that it has an instance property.
const singleton = {};
Object.defineProperty(singleton, "instance", {
    get: function () {
        return global[DB_KEY];
    }
});
Object.freeze(singleton);

module.exports = singleton;