import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../shared/components/dialog-message/dialog-message';
import { CommonResponse } from '../../shared/model/common-response.dto';
import { DialogMessageTypes } from '../../shared/model/dialog-message-types';
import { DialogMessage } from '../../shared/model/dialog-message.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public openDialogMessage(
    dialog: MatDialog,
    dialogMessage: DialogMessage,
  ): MatDialogRef<any> {
    return dialog.open(DialogMessageComponent, dialogMessage.getDialogJson());
  }

  public openDialog(dialog: MatDialog, type: string, message: string): void {
    this.openDialogMessage(dialog, new DialogMessage(type, message, ''));
  }

  public openConfirmDialog(
    dialog: MatDialog,
    action: string,
    element: string,
  ): MatDialogRef<any> {
    return this.openDialogMessage(
      dialog,
      new DialogMessage(
        DialogMessageTypes.CONFIRM,
        `¿${action} ${element}?`,
        DialogMessageTypes.DELETE_MESSAGE,
      ),
    );
  }

  public openLoadingDialog(dialog: MatDialog): MatDialogRef<any> {
    return this.openDialogMessage(
      dialog,
      new DialogMessage(
        DialogMessageTypes.LOADING,
        DialogMessageTypes.LOADING_TITLE,
        DialogMessageTypes.LOADING_DATA_MESSAGE,
      ),
    );
  }

  public openErrorDialog(
    dialog: MatDialog,
    status: number,
    message: string,
  ): MatDialogRef<any> {
    let errorType: string = '';
    let errorTitle: string;
    let errorMessage: string;
    switch (status) {
      case 400:
        errorType = DialogMessageTypes.WARNING;
        errorTitle = DialogMessageTypes.BAD_REQUEST;
        errorMessage = DialogMessageTypes.BAD_REQUEST_MESSAGE;
        break;
      case 401:
        errorType = DialogMessageTypes.WARNING;
        errorTitle = DialogMessageTypes.UNAUTHORIZED_ERROR;
        errorMessage = DialogMessageTypes.UNAUTHORIZED_ERROR_MESSAGE;
        break;
      case 404:
        errorType = DialogMessageTypes.WARNING;
        errorTitle = DialogMessageTypes.NOT_FOUND_ERROR;
        errorMessage = message;
        break;
      case 409:
        errorType = DialogMessageTypes.WARNING;
        errorTitle = DialogMessageTypes.CONFLICT;
        errorMessage = message;
        break;
      case 500:
      default:
        errorType = DialogMessageTypes.ERROR;
        errorTitle = DialogMessageTypes.SERVER_ERROR;
        errorMessage = DialogMessageTypes.SERVER_ERROR_MESSAGE;
        break;
    }
    return this.openDialogMessage(
      dialog,
      new DialogMessage(errorType, errorTitle, errorMessage),
    );
  }

  public startProcessing(
    dialog: MatDialog,
    formGroup: FormGroup | undefined,
  ): void {
    if (formGroup) {
      formGroup.disable();
    }
    dialog.open(
      DialogMessageComponent,
      new DialogMessage(
        DialogMessageTypes.LOADING,
        DialogMessageTypes.LOADING_TITLE,
        DialogMessageTypes.LOADING_REQUEST_MESSAGE,
      ).getDialogJson(),
    );
  }

  public endProcessing(
    dialog: MatDialog,
    formGroup: FormGroup | undefined,
  ): void {
    if (formGroup) {
      formGroup.enable();
    }
    dialog.closeAll();
  }

  public successDialog(
    dialog: MatDialog,
    formGroup: FormGroup,
    result: CommonResponse,
  ): void {
    this.endProcessing(dialog, formGroup);
    this.openDialog(dialog, DialogMessageTypes.SUCCESS, result.response);
  }

  public errorDialog(dialog: MatDialog, formGroup: FormGroup, e: any): void {
    this.endProcessing(dialog, formGroup);
    this.openErrorDialog(dialog, e.status, e.error.response);
  }
}
