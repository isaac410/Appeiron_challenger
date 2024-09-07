import { Types } from 'mongoose';
import { getDb } from '../migrations-utils/db';
import { Role } from '../../domain/user/role.enum';
import { UserStatus } from '../../domain/user/user-status.enum';

export const up = async () => {
  const db = await getDb();
  const collectionName = 'user';

  // Check if the collection already exists
  const collections = await db
    .listCollections({ name: collectionName })
    .toArray();
  const collectionExists = collections.length > 0;

  // Create the collection only if it does not exist
  if (!collectionExists) {
    await db.createCollection(collectionName);
  }

  const collectionUser = db.collection(collectionName);

  const adminId = new Types.ObjectId('65282fbb418998f093e06454');

  const newAdmin = {
    _id: adminId,
    name: 'isaac',
    lastname: 'mendoza',
    email: 'isaac.mendoza.ccs@gmail.com',
    password: '$2a$10$beMQZUPvIeBBBXttM8dal.qn.LuFtY.Y/4tEzgOdPpV7N9I1LBeeu', // pass = 1@Abcdefgh
    status: UserStatus.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: adminId,
    updatedBy: adminId,
    role: Role.ADMIN,
  };

  await collectionUser.insertOne(newAdmin);
};

export const down = async () => {
  const db = await getDb();
  const collectionUser = db.collection('user');
  const userAdminToDelete = {
    email: 'isaac.mendoza.ccs@gmail.com',
  };
  await collectionUser.deleteMany(userAdminToDelete);
};
