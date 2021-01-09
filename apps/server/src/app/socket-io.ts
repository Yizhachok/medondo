import {Server} from 'http';

import {Server as SocketIoServer, Socket} from 'socket.io';
import {SocketEvents} from '@medondo/api-interfaces/enums/socket-events';
import {addOnline, removeUser} from './users-service';

let socketIoServer;

export function initSocketIo(httpServer: Server) {
	socketIoServer = new SocketIoServer(httpServer);
	socketIoServer.on('connection', (socket: Socket) => {
		let userId;

		socket.on(SocketEvents.MESSAGE, (message) => emitEvent(SocketEvents.MESSAGE, message));
		socket.on(SocketEvents.SIGN_IN_ONLINE, (id) => {
			userId = id;
			addOnline(id);
			emitEvent(SocketEvents.SIGN_IN_ONLINE, id);
		});

		socket.on('disconnect', () => {
			if (userId) {
				emitEvent(SocketEvents.SIGN_OUT, userId);
				removeUser(userId);
			}
		});
	});
}

export function emitEvent<T>(eventName: SocketEvents, data: T): void {
	socketIoServer?.sockets.emit(eventName, data);
}
