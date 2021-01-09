import {NgModule} from '@angular/core';
import {ChatComponent} from './chat.component';
import {SharedModule} from '../../shared/shared.module';
import {ChatRoutingModule} from './chat-routing.module';

@NgModule({
	declarations: [ChatComponent],
	imports: [
		SharedModule,
		ChatRoutingModule,
	],
})
export class ChatModule {
}
