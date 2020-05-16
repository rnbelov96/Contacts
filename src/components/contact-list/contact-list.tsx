import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Contact, ErrorStatus } from '../../types';
import ContactItem from '../contact-item/contact-item';
import errorImg from '../../images/loading-error-img.jpg';
import emptyListImg from '../../images/empty-list-img.jpg';
import filterContacts from '../../utils/filterContacts';


type Props = {
  contactList: Contact[],
  onEditButtonClick: (contact: Contact) => void,
  onDeleteButtonClick: (contact: Contact) => void,
  onCreateButtonClick: () => void,
  errorStatus: ErrorStatus,
  isContactsLoading: boolean,
  isRequestLoading: boolean,
  searchInputValue: string
}

const ContactList: React.FC<Props> = (props: Props) => {
  const {
    contactList,
    onEditButtonClick,
    onDeleteButtonClick,
    onCreateButtonClick,
    errorStatus,
    isContactsLoading,
    isRequestLoading,
    searchInputValue,
  } = props;

  const contactsToRender = filterContacts(contactList, searchInputValue);

  const loadingErrorMessage = (
    <div className="message-block">
      <h1>
        Connection with server failed. Please try again later.
      </h1>
      <img src={errorImg} alt="Loading failed" />
    </div>
  );

  const emptyListMessage = (
    <div className="message-block">
      <h1>There is nothing to show.</h1>
      <img src={emptyListImg} alt="Nothing found" />
    </div>
  );

  const mainContent = (
    <>
      <table className="table mb-0">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {contactsToRender.map(contact => (
            <ContactItem
              onEditButtonClick={onEditButtonClick}
              contact={contact}
              key={contact.id}
              onDeleteButtonClick={onDeleteButtonClick}
            />
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-primary create-button"
        onClick={() => onCreateButtonClick()}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </>
  );

  const contactsLoadingBlock = (
    <div className="message-block">
      <h1>Contacts loading...</h1>
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    </div>
  );

  const requestLoadingBlock = (
    <div className="lds-ring mt-5 mx-auto d-block">
      <div />
      <div />
      <div />
      <div />
    </div>
  );

  if (isContactsLoading) {
    return contactsLoadingBlock;
  }

  if (errorStatus === ErrorStatus.LOADING_FAILED) {
    return loadingErrorMessage;
  }

  if (isRequestLoading) {
    return requestLoadingBlock;
  }

  if (contactsToRender.length === 0) {
    return emptyListMessage;
  }

  return mainContent;
};

export default ContactList;
