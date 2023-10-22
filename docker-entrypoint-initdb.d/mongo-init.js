print(
  'Start #################################################################',
);

var adminDB = db.getSiblingDB('admin');

adminDB.auth(
  process.env['MONGO_INITDB_ROOT_USERNAME'],
  process.env['MONGO_INITDB_ROOT_PASSWORD'],
);

adminDB.createUser({
  user: process.env["MONGO_NON_ROOT_USERNAME"],
  pwd: process.env['MONGO_NON_ROOT_PASSWORD'],
  roles: [{ role: "readWrite", db: process.env["MONGO_INITDB_DATABASE"]}]
})

adminDB.logout()

print('END #################################################################');
