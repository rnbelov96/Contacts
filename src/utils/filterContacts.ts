import { Contact } from '../types';

export default (contactList: Contact[], searchInputValue: string): Contact[] => {
  const newContactList: Contact[] = [];

  contactList.forEach(el => {
    if (
      el.name.toLocaleLowerCase().includes(searchInputValue.toLocaleLowerCase())
    ) {
      newContactList.push(el);
    }
  });
  return newContactList;
};
