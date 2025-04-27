'use server';
import {createAdminClient} from "@/config/appwrite";
import { ID,Query } from "node-appwrite";

async function createUser(previousState,formData) {
    const name=formData.get('name');
    const email=formData.get('email');    
    const password=formData.get('password');
    const confirmPassword=formData.get('confirm_password');    


    if(!name || !email || !password){
        return {
            error:'Please fill all fields',
        };
    }

    if(password.length<8){
        return {
            error:'The Password must be at least 8 characters long',
        };
    }

    if(password!=confirmPassword){
        return {
            error:'Passwords dont match',
        };
    }

    //instancia de la cuenta
    const {account,databases} = await createAdminClient();
    try {
        // Crear usuario
        const user = await account.create(ID.unique(), email, password, name);

        // Buscar rol 'user'
        const roles = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROLES,
            [Query.equal('name', ['user'])] // IMPORTANTE: el valor es un array
        );

        if (roles.documents.length === 0) {
            return { error: 'Role "user" not found' };
        }

        const roleId = roles.documents[0].$id;

       
        await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER_ROLES,
            ID.unique(),
            {
                user_id: user.$id,
                roles_id: [roleId],
            }
        );

        return { success: true };

    } catch (error) {
        console.error("Error creating user:", error);
        return { error: 'An error occurred during registration' };
    }
}

export default createUser;