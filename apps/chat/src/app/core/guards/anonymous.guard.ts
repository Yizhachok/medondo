import {Injectable} from '@angular/core';
import {CanActivate, UrlTree, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from '@core/services/account.service';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class AnonymousGuard implements CanActivate, CanActivateChild {
	constructor(
		private _account: AccountService,
		private _router: Router,
	) {
	}

	public canActivate(): Observable<boolean | UrlTree> {
		return this._account.auth$.pipe(map((auth) => !auth || this._router.createUrlTree(['chat'])));
	}

	public canActivateChild(): Observable<boolean | UrlTree> {
		return this.canActivate();
	}
}
