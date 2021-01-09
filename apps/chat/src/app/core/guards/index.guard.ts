import {Injectable} from '@angular/core';
import {CanActivate, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from '@core/services/account.service';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class IndexGuard implements CanActivate {
	constructor(
		private _account: AccountService,
		private _router: Router,
	) {
	}

	canActivate(): Observable<UrlTree> {
		return this._account.auth$.pipe(map((auth) => this._router.createUrlTree([auth ? 'chat' : 'entry'])));
	}
}
