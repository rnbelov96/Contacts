import * as React from 'react';
import validator from 'validator';
import api from '../../api';
import {
  Contact, ErrorStatus, AuthorizationStatus, LoginData,
} from '../../types';
import ContactList from '../contact-list/contact-list';
import CreateWindow from '../create-window/create-window';
import findAndUpdateContact from '../../utils/findAndUpdateContact';
import DeleteConfirmWindow from '../delete-confirm-window/delete-confirm-window';
import findAndDeleteContact from '../../utils/findAndDeleteContact';
import SearchBar from '../search-bar/search-bar';
import SignIn from '../sign-in/sign-in';

type Props = {
}

type AuthServerResponse = {
  accessToken: string
}

const App: React.FC<Props> = () => {
  const [contactList, setContactList] = React.useState<Contact[]>([]);
  const [isEditWindowVisible, setEditWindowVisibility] = React.useState<boolean>(false);
  const [isCreateWindowVisible, setCreateWindowVisibility] = React.useState<boolean>(false);
  const [contactToEdit, setContactToEdit] = React.useState<Contact | null>(null);
  const [isDeleteWindowVisible, setDeleteWindowVisibility] = React.useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = React.useState<string>('');
  const [errorStatus, setErrorStatus] = React.useState<ErrorStatus>(ErrorStatus.OK);
  const [isContactsLoading, setContactsLoadingStatus] = React.useState<boolean>(true);
  const [
    authorizationStatus,
    setAuthorizationStatus,
  ] = React.useState<AuthorizationStatus>(AuthorizationStatus.NO_AUTH);
  const [isSessionChecking, setSessionCheckingStatus] = React.useState<boolean>(true);
  const [isRequestLoading, setRequestLoadingStatus] = React.useState<boolean>(false);

  React.useEffect(() => {
    api.request({
      url: '/auth/login',
    }).then(() => {
      setSessionCheckingStatus(false);
      setAuthorizationStatus(AuthorizationStatus.AUTH);
      api.request<Contact[]>({
        url: '/contacts',
      }).then(response => {
        const { data: contacts } = response;
        setContactList(contacts);
        setContactsLoadingStatus(false);
      }).catch(() => {
        setErrorStatus(ErrorStatus.LOADING_FAILED);
        setContactsLoadingStatus(false);
      });
    }).catch(() => {
      setSessionCheckingStatus(false);
    });
  }, []);

  React.useEffect(() => {
    setRequestLoadingStatus(false);
  }, [contactList]);

  const handleEditButtonClick = (contact: Contact): void => {
    setContactToEdit(contact);
    setEditWindowVisibility(true);
  };

  const handleCloseButtonClick = () => {
    setEditWindowVisibility(false);
    setDeleteWindowVisibility(false);
    setCreateWindowVisibility(false);
    setContactToEdit(null);
    setErrorStatus(ErrorStatus.OK);
  };

  const handleUpdateButtonClick = (contactToUpdate: Contact): void => {
    api.request<Contact>({
      method: 'PATCH',
      url: `/contacts/${contactToUpdate.id}`,
      data: {
        ...contactToUpdate,
      },
    }).then(response => {
      const { data: contact } = response;
      setContactList(findAndUpdateContact(contactList, contact));
      setEditWindowVisibility(false);
      setErrorStatus(ErrorStatus.OK);
    }).catch(() => {
      setErrorStatus(ErrorStatus.LOADING_FAILED);
    });
  };

  const handleDeleteButtonClick = (contact: Contact): void => {
    setContactToEdit(contact);
    setDeleteWindowVisibility(true);
  };

  const handleDeleteConfirmClick = (contactToDelete: Contact): void => {
    api.request({
      method: 'DELETE',
      url: `/contacts/${contactToDelete.id}`,
    }).then(() => {
      setContactList(findAndDeleteContact(contactList, contactToDelete));
      handleCloseButtonClick();
    });
  };

  const handleCreateButtonClick = (): void => {
    setCreateWindowVisibility(true);
  };

  const handleSearchBarChange = (value: string): void => {
    setSearchInputValue(value);
  };

  const handleLoginButtonClick = (loginData: LoginData): void => {
    setRequestLoadingStatus(true);
    if (!validator.isEmail(loginData.email)) {
      setErrorStatus(ErrorStatus.WRONG_EMAIL);
      setRequestLoadingStatus(false);
      return;
    }
    api.request<AuthServerResponse>({
      method: 'POST',
      url: '/auth/login',
      data: {
        ...loginData,
      },
    }).then(res => {
      const { data } = res;
      const { accessToken: token } = data;
      localStorage.setItem('token', `Bearer ${token}`);
      setAuthorizationStatus(AuthorizationStatus.AUTH);
      setErrorStatus(ErrorStatus.OK);
      setRequestLoadingStatus(false);
      api.request<Contact[]>({
        url: '/contacts',
      }).then(response => {
        const { data: contacts } = response;
        setContactList(contacts);
        setContactsLoadingStatus(false);
      }).catch(() => {
        setErrorStatus(ErrorStatus.LOADING_FAILED);
        setContactsLoadingStatus(false);
      });
    }).catch(() => {
      setRequestLoadingStatus(false);
      setErrorStatus(ErrorStatus.WRONG_LOGIN_DATA);
    });
  };

  const handleCreateConfirmClick = (contactToCreate: Contact): void => {
    api.request<Contact>({
      method: 'POST',
      url: '/contacts',
      data: {
        ...contactToCreate,
      },
    }).then(response => {
      const { data: contact } = response;
      setContactList(prevState => [contact, ...prevState]);
      handleCloseButtonClick();
      setErrorStatus(ErrorStatus.OK);
    }).catch(() => {
      setErrorStatus(ErrorStatus.LOADING_FAILED);
    });
  };

  const renderApp = () => {
    if (isSessionChecking) {
      return (
        <div className="message-block">
          <h1>Authentication in process...</h1>
          <div className="lds-facebook">
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    }

    if (authorizationStatus === AuthorizationStatus.AUTH) {
      return (
        <>
          {isCreateWindowVisible
            ? (
              <CreateWindow
                onCloseButtonClick={handleCloseButtonClick}
                contact={null}
                onConfirmClick={handleCreateConfirmClick}
                errorStatus={errorStatus}
                setErrorStatus={setErrorStatus}
              />
            )
            : null}
          {isEditWindowVisible
            ? (
              <CreateWindow
                onCloseButtonClick={handleCloseButtonClick}
                contact={contactToEdit}
                onConfirmClick={handleUpdateButtonClick}
                errorStatus={errorStatus}
                setErrorStatus={setErrorStatus}
              />
            )
            : null}
          {isDeleteWindowVisible
            ? (
              <DeleteConfirmWindow
                contact={contactToEdit as Contact}
                onCloseButtonClick={handleCloseButtonClick}
                onDeleteConfirmClick={handleDeleteConfirmClick}
              />
            )
            : null}
          <SearchBar
            searchInputValue={searchInputValue}
            onSearchBarChahge={handleSearchBarChange}
          />
          <ContactList
            onEditButtonClick={handleEditButtonClick}
            onDeleteButtonClick={handleDeleteButtonClick}
            contactList={contactList}
            onCreateButtonClick={handleCreateButtonClick}
            errorStatus={errorStatus}
            isContactsLoading={isContactsLoading}
            isRequestLoading={isRequestLoading}
            searchInputValue={searchInputValue}
          />
        </>
      );
    }

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return (
        <SignIn
          onLoginButtonClick={handleLoginButtonClick}
          errorStatus={errorStatus}
          isRequestLoading={isRequestLoading}
        />
      );
    }

    return <p>Something went wrong...</p>;
  };

  return renderApp();
};

export default App;
