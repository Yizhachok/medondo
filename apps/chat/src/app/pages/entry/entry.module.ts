import {NgModule} from '@angular/core';
import {EntryComponent} from './entry.component';
import {SharedModule} from '../../shared/shared.module';
import {EntryRoutingModule} from './entry-routing.module';


@NgModule({
	declarations: [EntryComponent],
	imports: [
		SharedModule,
		EntryRoutingModule,
	],
})
export class EntryModule {
}
