import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {RouterModule} from '@angular/router';

@NgModule({
	declarations: [MainLayoutComponent],
	imports: [
		RouterModule,
		SharedModule,
	],
})
export class CoreModule {
}
