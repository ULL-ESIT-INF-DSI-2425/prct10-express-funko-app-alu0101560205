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

  // return db.collection<NoteInterface>('notes').findOne({
  //   _id: new ObjectId('681a3ba48e99965c5629674c'),
  // });

  return db.collection<NoteInterface>('notes').find({
    title: 'Red note',
  }).toArray();

}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});