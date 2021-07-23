export interface User {
    email: string;
}

export interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn: (userlogin: string) => void; 
    signOut: () => void;
}