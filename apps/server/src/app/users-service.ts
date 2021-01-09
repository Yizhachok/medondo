import {IUser} from '@medondo/api-interfaces/interfaces/user.interface';
import {ISignInPostReq} from '@medondo/api-interfaces/sign-in';

export const USERS: IUser[] = [];
let incrementalId = 0;

export function getNewId(): number {
	return ++incrementalId;
}

export function addNewUser(userReq: ISignInPostReq): IUser {
	const user: IUser = {
		...userReq,
		id: getNewId(),
		online: false,
	}
	USERS.push(user);
	return user;
}

export function addOnline(userId: number): void {
	const user = USERS.find(({id}) => id === userId);
	user.online = true;
}

export function removeUser(removeId: number): void {
	USERS.splice(USERS.findIndex(({id}) => id === removeId), 1);
}
