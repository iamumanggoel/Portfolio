import { Audit_property } from "./common.model";

export class User extends Audit_property {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    jobTitle?: string;
    company?: string;
    location?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    profilePicture?: string;
}

export class Role extends Audit_property{
    id?: number;
    name?: string;
}