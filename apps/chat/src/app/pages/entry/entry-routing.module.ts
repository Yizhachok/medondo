import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {EntryComponent} from './entry.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: EntryComponent,
			},
		]),
	],
	exports: [RouterModule],
})
export class EntryRoutingModule {
}
