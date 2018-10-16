export interface User {
    id: number;
    account: string;
    email: string;
    name: string;
    avatar: string; // avatar url;
    isAdmin: boolean;
    storedArticles: number[];
}

export interface GithubAuthConfig {
    clientId: string;
    redirect: string;
    state: string;
}

export type StoreOperate = 'add' | 'remove' | 'clear';
