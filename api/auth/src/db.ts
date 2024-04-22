import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { User } from "./models/user.model";


type Schema = {
  users: User[];
};

let db: lowdb.LowdbSync<Schema>;

export const createConnection = async () => {
  const adapter = new FileSync<Schema>("./users.json");
  db = lowdb(adapter);
  db.defaults({ users: [] }).write();
};

export const getConnection = () => db;