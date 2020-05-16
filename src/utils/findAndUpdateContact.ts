import { Contact } from '../types';

export default (
  contactList: Contact[],
  contact: Contact,
) => contactList.map(el => (el.id === contact.id ? contact : el));
