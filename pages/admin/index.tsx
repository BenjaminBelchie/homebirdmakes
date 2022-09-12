import { signOut, useSession } from 'next-auth/react';
export default function AdminPage(){
    const { data: session, status } = useSession();

    return(
        <h1>Hello {session?.user?.name}</h1>
    )
}