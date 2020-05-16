import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Contact } from '../../types';

type Props = {
  contact: Contact,
  onEditButtonClick: (contact: Contact) => void,
  onDeleteButtonClick: (contact: Contact) => void,
}

const ContactItem: React.FC<Props> = (props: Props) => {
  const { contact, onEditButtonClick, onDeleteButtonClick } = props;
  return (
    <tr>
      <td className="align-middle">{contact.name}</td>
      <td className="align-middle">{contact.phone}</td>
      <td className="control-btns">
        <button
          type="button"
          className="control-btns__edit btn btn-primary"
          onClick={() => onEditButtonClick(contact)}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          type="button"
          className="control-btns__delete btn btn-danger"
          onClick={() => onDeleteButtonClick(contact)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default ContactItem;
