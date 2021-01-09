import { RemoveSpecialCharPipe } from './../shared/pipe/remove-special-char.pipe';
import { SharedModule } from './../shared/shared.module';
import { SocketService } from './../socket.service';
import { ChatRouteGuardService } from './chat-route-guard.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChatBoxComponent, RemoveSpecialCharPipe],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forChild([{path : 'chat', component : ChatBoxComponent, canActivate : [ChatRouteGuardService]}]),
    SharedModule
  ],
  providers : []
})
export class ChatModule { }
