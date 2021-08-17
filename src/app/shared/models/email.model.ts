export class Email {
  destination: string;
  subject: string;
  text: string;

  constructor({ destination = null, subject = null, text = null }) {
    this.destination = destination;
    this.subject = subject;
    this.text = text;
  }
}
