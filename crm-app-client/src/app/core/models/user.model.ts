export interface User {
    id: string;
    email?: string;
    roles?: string[];
    unverified?: boolean;
    blocked?: boolean;
    goodUser?: boolean;
    goodAdmin?: boolean;
}