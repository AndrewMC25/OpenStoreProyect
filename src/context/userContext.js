import { useRouter } from "next/navigation";
import getUser from "../service/frontend/getUserServices";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getUser();
                if(!data){
                    router.push('/sign-up');
                }
                setUser({
                    email: data.data.email,
                    username: data.data.username,
                    id: data.data.id
                });
            } catch (error) {
                router.push('/sign-up');
            }
        };
        getData();
    }, []);

    return(
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
}