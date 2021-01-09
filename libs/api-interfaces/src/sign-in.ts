import {IUser} from '@medondo/api-interfaces/interfaces/user.interface';

// POST
export interface ISignInPostReq {
	name: string;
}

export interface ISignInPostRes extends IUser {
}
