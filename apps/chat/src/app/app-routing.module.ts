import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AnonymousGuard} from '@core/guards/anonymous.guard';
import {AuthGuard} from '@core/guards/auth.guard';
import {IndexGuard} from '@core/guards/index.guard';
import {MainLayoutComponent} from '@core/main-layout/main-layout.component';

@NgModule({
	imports: [
		RouterModule.forRoot([
			{
				path: '',
				children: [],
				canActivate: [IndexGuard],
			},
			{
				path: 'entry',
				canActivateChild: [AnonymousGuard],
				loadChildren: () => import('./pages/entry/entry.module').then(m => m.EntryModule),
			},
			{
				path: '',
				component: MainLayoutComponent,
				canActivateChild: [AuthGuard],
				children: [
					{
						path: 'chat',
						loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule),
					},
				],
			},
			{
				path: '**',
				redirectTo: '/',
			},
		]),
	],
	exports: [
		RouterModule,
	],
})
export class AppRoutingModule {
}
