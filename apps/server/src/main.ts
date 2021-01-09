import http, {Server} from 'http';

import express, {Request, Response, Router} from 'express';
import {emitEvent, initSocketIo} from './app/socket-io';
import {ISignInPostReq, ISignInPostRes} from '@medondo/api-interfaces/sign-in';
import {addNewUser, USERS} from './app/users-service';
import {IUsersGetRes} from '@medondo/api-interfaces/users';
import {IUser} from '@medondo/api-interfaces/interfaces/user.interface';
import {SocketEvents} from '@medondo/api-interfaces/enums/socket-events';

const app = express();
const httpAppServer: Server = http.createServer(app);

initSocketIo(httpAppServer);

app.use(express.json());

const router: Router = Router();
app.use('/api', router);

router.post<never, ISignInPostRes, ISignInPostReq>('/sign-in', (
	req: Request<never, ISignInPostRes, ISignInPostReq>,
	res: Response<ISignInPostRes>,
) => {
	const user: IUser = addNewUser(req.body);
	emitEvent(SocketEvents.SIGN_IN, user);
	res.json(user);
});

router.get<never, IUsersGetRes>('/users', (
	req: Request<never, IUsersGetRes>,
	res: Response<IUsersGetRes>,
) => {
	res.json({users: USERS});
});

const port = 3333;
const ip = '0.0.0.0';

httpAppServer.listen(port, ip, () => console.info(`Server running at http://${ip}:${port}`));
