export class DialogMessage {
  type: string;
  title: string;
  message: string;

  constructor(type: string | undefined, title: string | undefined, message: string | undefined) {
    this.type = type === undefined ? '' : type;
    this.title = title === undefined ? '' : title;;
    this.message = message === undefined ? '' : message;
  }

  public getDialogJson() {
    return {
      data: {
        type: this.type,
        title: this.title,
        message: this.message
      }
    };
  }
}
