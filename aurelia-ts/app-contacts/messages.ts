export class ContactUpdated {
  public contact;
  constructor(contact){
    this.contact = contact;
  }
}

export class ContactViewed {
  public contact;
  constructor(contact){
    this.contact = contact;
  }
}
