import { getDb } from 'src/infrastructure/migrations-utils/db';

export const up = async () => {
  const db = await getDb();
  db.collection('collection_name');
  /*
      Code your update script here!
   */
};

export const down = async () => {
  const db = await getDb();
  db.collection('collection_name');
  /*
      Code you downgrade script here!
   */
};
