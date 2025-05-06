import { MongoClient, ObjectId } from 'mongodb';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'notes-app';

interface NoteInterface {
  title: string,
  body: string,
  color: 'blue' | 'green' | 'red' | 'yellow' | 'magenta'
}

MongoClient.connect(dbURL).then((client) => {
  const db = client.db(dbName);

  return db.collection<NoteInterface>('notes').updateOne({
    _id: new ObjectId('681a3b3b3f89c4d76e81e35d'),
  }, {
    $set: {
      title: 'Green note',
      body: 'This is a green note updated',
      color: 'green',
    },
  });
}).then((result) => {
  console.log(result.modifiedCount);
}).catch((error) => {
  console.log(error);
});

// va a imprimir por consola un 1 porque es el numero de documentos que se han actualizado
// si no se actualiza nada, imprime 0