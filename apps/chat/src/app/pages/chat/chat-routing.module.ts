import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ChatComponent} from './chat.component';
import {UsersResolverService} from './users-resolver.service';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				resolve: {
					users: UsersResolverService,
				},
				component: ChatComponent,
			},
		]),
	],
	exports: [RouterModule],
})
export class ChatRoutingModule {
}
