import * as React from 'react';
import { Contact } from '../../types';

type Props = {
  contact: Contact,
  onCloseButtonClick: () => void,
  onDeleteConfirmClick: (contact: Contact) => void,
}

const DeleteConfirmWindow: React.FC<Props> = (props: Props) => {
  const { contact, onCloseButtonClick, onDeleteConfirmClick } = props;
  return (
    <div className="delete-confirm-field">
      <div className="delete-confirm-field__modal">
        <h2 className="delete-confirm-field__text">Are you sure you want to delete this contact?</h2>
        <div className="delete-confirm-field__buttons">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onDeleteConfirmClick(contact)}
          >
            Yes
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onCloseButtonClick()}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmWindow;
