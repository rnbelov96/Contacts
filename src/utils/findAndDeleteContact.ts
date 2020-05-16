import { Contact } from '../types';

export default (contactList: Contact[], contact: Contact) => {
  const index = contactList.findIndex(el => el.id === contact.id);

  const newContactList = [...contactList];
  newContactList.splice(index, 1);
  return newContactList;
};
