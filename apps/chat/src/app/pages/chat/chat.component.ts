import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '@shared/services/chat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '@core/services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from '@medondo/api-interfaces/interfaces/user.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {IMessage} from '@medondo/api-interfaces/interfaces/message.interface';
import {scan} from 'rxjs/operators';

@Component({
	selector: 'medondo-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
	public users$: Observable<IUser[]>;
	public messages$: Observable<IMessage[]>;

	public sidebarOpen = true;
	public allUsers: {[userId: number]: IUser} = {};
	public form: FormGroup = this._formBuilder.group({
		text: ['', [Validators.required]],
	});

	private readonly _usersBehaviorSubject: BehaviorSubject<IUser[]> = new BehaviorSubject([]);

	constructor(
		public accountService: AccountService,
		public chatService: ChatService,
		private _route: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _router: Router,
	) {
		this.users$ = this._usersBehaviorSubject.asObservable();
	}

	public ngOnInit(): void {
		this.chatService.connect();
		this.chatService.setOnline(this.accountService.data.id);

		this._route.data.subscribe(({users}: {users: IUser[]}) => this._addUsers(users));

		this.chatService
			.onUserJoin()
			.subscribe((user) => this._addUsers([user]));

		this.chatService
			.onUserOnline()
			.subscribe((userId) => this._setUserOnline(userId));

		this.chatService
			.onUserDisconnect()
			.subscribe(({id}) => this._removeUser(id));

		this.messages$ = this.chatService
			.onMessage()
			.pipe(
				scan<IMessage, IMessage[]>((acc, message) => {
					acc.push(message);
					return acc;
				}, []),
			);
	}

	public ngOnDestroy(): void {
		this.chatService.disconnect();
	}

	public onSend(): void {
		if (this.form.valid) {
			this.chatService.sendMessage({
				...this.form.value,
				user: this.accountService.data.id,
				time: new Date().toJSON(),
			});
			this.form.reset();
		}
	}

	public signOut(): void {
		this.accountService.signOut();
		void this._router.navigateByUrl('/entry');
	}

	public userClick(user: IUser): void {
		let text = (this.form.value.text || '').trim();
		if (text.length) {
			text += ' ';
		}
		this.form.patchValue({
			text: `${text}@${user.name} `
		});
	}

	private _addUsers(users: IUser[]) {
		const currentUsers: IUser[] = this._usersBehaviorSubject.getValue();

		for (const user of users) {
			this.allUsers[user.id] = user;
			if (user.id !== this.accountService.data.id) {
				currentUsers.push(user);
			}
		}

		this._usersBehaviorSubject.next(currentUsers);
	}

	private _setUserOnline(userId: number) {
		if (userId !== this.accountService.data.id) {
			const currentUsers: IUser[] = this._usersBehaviorSubject.getValue();

			const onlineUser: IUser = currentUsers.find(({id}) => id === userId);

			if (onlineUser) {
				onlineUser.online = true;
				this._usersBehaviorSubject.next(currentUsers);
			}
		}
	}

	private _removeUser(userId: number) {
		const currentUsers: IUser[] = this._usersBehaviorSubject.getValue();

		currentUsers.splice(currentUsers.findIndex(({id}) => id === userId), 1);

		this._usersBehaviorSubject.next(currentUsers);
	}
}
