import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'medondo-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
}
