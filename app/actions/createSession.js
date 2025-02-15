'use server';

import { createAdminClient } from "@/config/appwrite";
import { cookies } from "next/headers";
async function createSession(previousState,formData) {
    const email=formData.get('email');
    const password=formData.get('password');

    if(!email || !password){
        return {
            error:'Fill out everything please'
        }
    }
    
    //account instance
    const {account}=await createAdminClient();

    try {
        const session=await account.createEmailPasswordSession(email,password);
        const cookie=await cookies();        //cookies
        cookie.set('appwrite-session',session.secret,{
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            expires:new Date(session.expire),
            path:'/'
        })

        
        return {
            success:true,
        }
    } catch (error) {
        console.log('Error in authentication',error);
        return {
            error:'Invalid Credentials'
        }
    }


    
}

export default createSession;