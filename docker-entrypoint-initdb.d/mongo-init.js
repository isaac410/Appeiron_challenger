// to user of app
db.createUser({
  user: 'root',
  pwd: 'pass',
  roles: [
    {
      role: 'readWrite',
      db: 'apperion_node_challeger',
    },
  ],
});
