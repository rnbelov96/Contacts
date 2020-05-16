import * as React from 'react';
import { LoginData, ErrorStatus } from '../../types';

type Props = {
  onLoginButtonClick: (data: LoginData) => void,
  isRequestLoading: boolean,
  errorStatus: ErrorStatus
}

const SignIn: React.FC<Props> = (props: Props) => {
  const { onLoginButtonClick, errorStatus, isRequestLoading } = props;

  const emailInputEl = React.useRef<HTMLInputElement>(null);
  const passwordInputEl = React.useRef<HTMLInputElement>(null);
  return (
    <form
      className="signin-form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLoginButtonClick({
          email: emailInputEl.current?.value as string,
          password: passwordInputEl.current?.value as string,
        });
      }}
    >
      <h1 className="mb-3 text-center">Sign In</h1>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          required
          ref={emailInputEl}
          type="email"
          className="form-control"
          id="email"
          disabled={isRequestLoading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          required
          ref={passwordInputEl}
          type="password"
          className="form-control"
          id="password"
          disabled={isRequestLoading}
        />
      </div>
      <div
        className="alert alert-danger"
        role="alert"
        style={{ display: errorStatus === ErrorStatus.WRONG_LOGIN_DATA ? 'block' : 'none' }}
      >
        Wrong login or password.
      </div>
      <div
        className="alert alert-danger"
        role="alert"
        style={{ display: errorStatus === ErrorStatus.WRONG_EMAIL ? 'block' : 'none' }}
      >
        Please enter a valid email.
      </div>
      <button
        type="submit"
        className="btn btn-primary signin-form__button"
        disabled={isRequestLoading}
      >
        Log In
      </button>
    </form>
  );
};

export default SignIn;
