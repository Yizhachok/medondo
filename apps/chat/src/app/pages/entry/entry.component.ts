import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '@core/services/account.service';
import {Router} from '@angular/router';

@Component({
	selector: 'medondo-entry',
	templateUrl: './entry.component.html',
	styleUrls: ['./entry.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryComponent {
	public form: FormGroup = this._formBuilder.group({
		name: ['', [Validators.required, Validators.minLength(2)]],
	});

	constructor(
		private _formBuilder: FormBuilder,
		private _accountService: AccountService,
		private _router: Router,
	) {
	}

	public onSubmit(): void {
		if (this.form.valid) {
			this._accountService
				.signIn(this.form.value)
				.subscribe(() => void this._router.navigateByUrl('/chat'));
		}
	}
}
