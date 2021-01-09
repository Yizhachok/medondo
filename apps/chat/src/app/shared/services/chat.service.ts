import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IUser} from '@medondo/api-interfaces/interfaces/user.interface';
import {IMessage} from '@medondo/api-interfaces/interfaces/message.interface';
import {SocketIoService} from '@core/services/socket-io.service';
import {SocketEvents} from '@medondo/api-interfaces/enums/socket-events';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	constructor(
		private _socketIoService: SocketIoService,
	) {
	}

	public connect(): void {
		this._socketIoService.connect();
	}

	public disconnect(): void {
		this._socketIoService.disconnect();
	}

	public onMessage(): Observable<IMessage> {
		return this._socketIoService.onEvent(SocketEvents.MESSAGE);
	}

	public onUserJoin(): Observable<IUser> {
		return this._socketIoService.onEvent(SocketEvents.SIGN_IN);
	}

	public onUserOnline(): Observable<number> {
		return this._socketIoService.onEvent(SocketEvents.SIGN_IN_ONLINE);
	}

	public onUserDisconnect(): Observable<{id: number}> {
		return this._socketIoService.onEvent(SocketEvents.SIGN_OUT);
	}

	public sendMessage(message: IMessage): void {
		this._socketIoService.emitEvent(SocketEvents.MESSAGE, message);
	}

	public setOnline(id: number): void {
		this._socketIoService.emitEvent(SocketEvents.SIGN_IN_ONLINE, id);
	}
}
