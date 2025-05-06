// Antes de ejecutar este código, hacer:
// sudo /home/usuario/mongodb/bin/mongod --dbpath /home/usuario/mongodb-data/

import { MongoClient } from 'mongodb';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'notes-app';

interface NoteInterface {
  title: string,
  body: string,
  color: 'blue' | 'green' | 'red' | 'yellow' | 'magenta'
}

MongoClient.connect(dbURL).then((client) => {
  const db = client.db(dbName);

  // El método insertOne es para insertar un único documento en la colección
  // return db.collection<NoteInterface>('notes').insertOne({
  //   title: 'Red note',
  //   body: 'This is a red note',
  //   color: 'red',
  // });
  return db.collection<NoteInterface>('notes').insertMany([ // insertMany permite insertar varios documentos a la vez
    {
      title: 'Yellow note',
      body: 'This is a yellow note',
      color: 'yellow',
    },
    {
      title: 'Magenta note',
      body: 'This is a magenta note',
      color: 'magenta',
    },
  ]);
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});