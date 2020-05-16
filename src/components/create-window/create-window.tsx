import * as React from 'react';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Contact, ErrorStatus } from '../../types';

type Props = {
  contact: Contact | null,
  onCloseButtonClick: () => void,
  onConfirmClick: (contact: Contact) => void,
  errorStatus: ErrorStatus,
  setErrorStatus: (status: ErrorStatus) => void
}

const CreateWindow: React.FC<Props> = (props: Props) => {
  const {
    contact,
    onCloseButtonClick,
    onConfirmClick,
    errorStatus,
    setErrorStatus,
  } = props;

  const nameInputEl = React.useRef<HTMLInputElement>(null);
  const phoneInputEl = React.useRef<HTMLInputElement>(null);

  return (
    <div className="edit-field">
      <form
        className="edit-field__form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const contactData: Contact = {
            name: nameInputEl.current?.value as string,
            phone: phoneInputEl.current?.value as string,
          };
          if (!validator.isMobilePhone(contactData.phone, 'ru-RU')) {
            setErrorStatus(ErrorStatus.WRONG_PHONE);
            return;
          }
          if (contact) {
            contactData.id = contact.id;
          }
          onConfirmClick(contactData);
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            ref={nameInputEl}
            defaultValue={contact ? contact.name : ''}
            required
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter a name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            ref={phoneInputEl}
            defaultValue={contact ? contact.phone : ''}
            type="text"
            className="form-control"
            id="phone"
            placeholder="Enter a phone number"
          />
        </div>
        <div
          className="alert alert-danger"
          role="alert"
          style={{ display: errorStatus === ErrorStatus.LOADING_FAILED ? 'block' : 'none' }}
        >
          Connection with server failed. Please try again later.
        </div>
        <div
          className="alert alert-danger"
          role="alert"
          style={{ display: errorStatus === ErrorStatus.WRONG_PHONE ? 'block' : 'none' }}
        >
          Please enter a valid phone number.
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Accept
        </button>
        <FontAwesomeIcon
          onClick={() => onCloseButtonClick()}
          icon={faTimes}
          className="edit-field__close"
        />
      </form>
    </div>
  );
};

export default CreateWindow;
