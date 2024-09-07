import { MongoClient } from 'mongodb';

const MONGO_DB_HOST_CONNECT =
  'mongodb://root:pass@mongo:27017/apperion_node_challeger';

export const getDb = async () => {
  const client: any = await MongoClient.connect(MONGO_DB_HOST_CONNECT);
  return client.db();
};
