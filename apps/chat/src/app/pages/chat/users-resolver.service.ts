import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IUser} from '@medondo/api-interfaces/interfaces/user.interface';
import {Observable} from 'rxjs';
import {Resolve} from '@angular/router';
import {IUsersGetRes} from '@medondo/api-interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<IUser[]> {
	constructor(
		private _http: HttpClient,
	) {
	}

	resolve(): Observable<IUser[]> {
		return this._http
			.get<IUsersGetRes>('/api/users')
			.pipe(map(({users}) => users));
	}
}
