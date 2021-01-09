import {Injectable} from '@angular/core';

import {io, Socket} from 'socket.io-client';
import {Observable} from 'rxjs';
import {SocketEvents} from '@medondo/api-interfaces/enums/socket-events';

@Injectable({
	providedIn: 'root',
})
export class SocketIoService {
	private _socket: Socket = io({
		autoConnect: false,
	});

	public connect(): void {
		this._socket.connect();
	}

	public disconnect(): void {
		this._socket.disconnect();
	}

	public onEvent<T>(eventName: SocketEvents): Observable<T> {
		return new Observable<T>((observer) => {
			const eventHandler = (data: T) => {
				observer.next(data);
			};

			this._socket.on(eventName, eventHandler);

			return {
				unsubscribe: () => this._socket.off(eventName, eventHandler),
			};
		});
	}

	public emitEvent<T>(eventName: SocketEvents, data: T): void {
		this._socket.emit(eventName, data);
	}
}
