'use server';
import {createAdminClient} from "@/config/appwrite";
import { ID } from "node-appwrite";

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
    const {account} = await createAdminClient();
    try {
        //crear el usuario
        await account.create(ID.unique(),email,password,name);

        return {
            success:true,
        }

    } catch (error) {
        return {
            error:'Error in the registration',
        };
    }

}

export default createUser;