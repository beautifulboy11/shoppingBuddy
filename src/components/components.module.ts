import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { MessagesComponent } from './messages/messages';
import { AppFooterComponent } from './app-footer/app-footer';
import { AccordionComponent } from './accordion/accordion';
@NgModule({
	declarations: [MessagesComponent,
		AppFooterComponent,
		AccordionComponent,],
	imports: [
		IonicModule
	],
	exports: [
		MessagesComponent,
		AppFooterComponent,
		AccordionComponent,
	]
})
export class ComponentsModule { }
