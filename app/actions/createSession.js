'use server';

async function createSession(previousState,formData) {
    const email=formData.get('email');
    const password=formData.get('password');

    if(!email || !password){
        return {
            error:'Fill out everything please'
        }
    }
    
}

export default createSession;