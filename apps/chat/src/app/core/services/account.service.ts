import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SocketIoService} from '@core/services/socket-io.service';
import {SocketEvents} from '@medondo/api-interfaces/enums/socket-events';
import {HttpClient} from '@angular/common/http';
import {ISignInPostReq, ISignInPostRes} from '@medondo/api-interfaces/sign-in';
import {IUser} from '@medondo/api-interfaces/interfaces/user.interface';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	public readonly data$: Observable<IUser>;
	public readonly auth$: Observable<boolean>;

	public get data(): IUser {
		return this._dataBehaviorSubject.getValue();
	}

	public get auth(): boolean {
		return !!this.data;
	}

	private _dataBehaviorSubject = new BehaviorSubject<IUser>(null);

	constructor(
		private _http: HttpClient,
		private _socketIoService: SocketIoService,
	) {
		this.data$ = this._dataBehaviorSubject.asObservable();
		this.auth$ = this.data$.pipe(map(data => !!data));
	}

	public signIn(signIn: ISignInPostReq): Observable<IUser> {
		return this._http
			.post<ISignInPostRes>('/api/sign-in', signIn)
			.pipe(map((account) => {
				this._dataBehaviorSubject.next(account);
				return account;
			}));
	}

	public signOut() {
		this._dataBehaviorSubject.next(null);
	}
}
