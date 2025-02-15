'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
async function destroySession() {
    const cookie=await cookies();
    const sessionCookie=cookie.get('appwrite-session');
    if(!sessionCookie){
        return {
            error:'No session cookie found'
        }
    }

    try {
        const {account}=await createSessionClient(sessionCookie.value);

        //delete session

        await account.deleteSession('current');

        //clear cookies
        const cookie=await cookies();
        cookie.delete('appwrite-session');

        return {
            success:true
        }
    } catch (error) {
        
        return {
            error:'Error in destroying the session'
        }
    }


    
}

export default destroySession;