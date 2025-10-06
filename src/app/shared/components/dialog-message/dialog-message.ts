import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogMessageTypes } from '../../model/dialog-message-types';
import { DialogMessage } from '../../model/dialog-message.model';

@Component({
  selector: 'app-dialog-message',
  imports: [
    CommonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-message.html',
  styleUrl: './dialog-message.scss',
})
export class DialogMessageComponent {
  readonly dialogMessageTypes: typeof DialogMessageTypes = DialogMessageTypes;

  public dialogMessage = inject<DialogMessage>(MAT_DIALOG_DATA);

  public typeMessageClass: string =
    this.dialogMessage.type.toLowerCase() + '-message';
}
