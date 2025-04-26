import dotenv from "dotenv";
import { createAdminClient } from "../config/appwrite.js";
import { ID, Query } from "node-appwrite";

dotenv.config({ path: ".env.local" });

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

const { account, databases, users } = createAdminClient();

// Default user data for setup
const defaultUsers = [
  {
    userId: ID.unique(),
    email: "admin@gmail.com",
    password: "adminpass123",
    role: "admin",
    name: "admin_2",
  },
  {
    userId: ID.unique(),
    email: "user@gmail.com",
    password: "userpass123",
    role: "user",
    name: "regular_user",
  },
];

async function createRoleIfNotExists(roleName) {
  try {
    const list = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROLES,
      [Query.equal("name", roleName)]
    );

    if (list.total === 0) {
      const role = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROLES,
        ID.unique(),
        { name: roleName }
      );
      return role.$id;
    } else {
      return list.documents[0].$id;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createUserIfNotExists({ userId, email, password, name }) {
  try {
    const existingUser = await users.get(userId);
    if (existingUser) {
      console.log(`User ${userId} already exists.`);
      return existingUser;
    }
  } catch (err) {
    if (err.code !== 404) {
      console.error("Error checking user existence:", err);
      throw err;
    }
  }

  const usersList = await users.list([Query.equal("email", email)]);

  if (usersList.total > 0) {
    return usersList.users[0];
  }

  const user = await users.create(userId, email, undefined, password, name);
  return user;
}

async function assignUserRole(userId, roleId) {
  try {

    const existingRoles = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER_ROLES,
      [Query.equal("user_id", userId)]
    );

    const rolesAlreadyAssigned = existingRoles.documents.some(roleDoc =>
      roleDoc.roles_id.includes(roleId)
    );

    if (rolesAlreadyAssigned) {
      console.log(`User ${userId} already has this role.`);
      return; 
    }

    
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER_ROLES,
      ID.unique(),
      {
        user_id: userId,
        roles_id: [roleId],
      }
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function setup() {
  console.log("Setting up users and roles...");

  const rolesMap = {};


  for (const roleName of ["admin", "user"]) {
    rolesMap[roleName] = await createRoleIfNotExists(roleName);
  }

  
  for (const userData of defaultUsers) {
    const user = await createUserIfNotExists(userData);
    if (user && rolesMap[userData.role]) {
      await assignUserRole(user.$id, rolesMap[userData.role]);
    }
  }

  console.log("Done.");
}

setup().catch((err) => {
  console.error("Error setting up users and roles:", err);
  process.exit(1);
});

