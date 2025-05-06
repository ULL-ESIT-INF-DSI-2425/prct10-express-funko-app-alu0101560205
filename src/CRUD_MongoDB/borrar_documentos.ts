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

  return db.collection<NoteInterface>('notes').deleteOne({
    title: 'Red note',
  });
}).then((result) => {
  console.log(result.deletedCount);
}).catch((error) => {
  console.log(error);
});