import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';

const SHARED_MODULES = [
	/* Angular */
	CommonModule,
	ReactiveFormsModule,

	/* 3rd party */
	MatButtonModule,
	MatIconModule,
	MatInputModule,
	MatSidenavModule,
	MatToolbarModule,
	MatDividerModule,
	MatCardModule,
	MatListModule,
	MatRippleModule,
];

@NgModule({
	declarations: [],
	imports: SHARED_MODULES,
	exports: [
		...SHARED_MODULES,
	],
})
export class SharedModule {
}
