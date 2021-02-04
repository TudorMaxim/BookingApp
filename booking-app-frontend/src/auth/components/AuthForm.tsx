import {
  Dispatch, FormEvent, FunctionComponent, SetStateAction, useEffect, useState,
} from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import BookingAppLogo from '../../assets/BookingAppLogo.png';
import { IAuthCredentials } from '../actions/types';
import FormInput, { useFormInput } from './FormInput';
import { useStore } from '../../context/store';
import { usernameValidator, emailValidator, passwordValidator } from '../validators';
import Flash from '../../common/Flash';
import './AuthForm.sass';

export enum AuthFormTypes {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    RECOVER = 'RECOVER'
}

interface AuthFormProps {
  type: AuthFormTypes;
  submitHandler: (credentials: IAuthCredentials) => void;
}

const AuthForm: FunctionComponent<AuthFormProps> = ({ type, submitHandler }) => {
  const { state } = useStore();
  const [validated, setValidated] = useState(false);
  const [username, validUsername, setUsermame] = useFormInput(usernameValidator);
  const [email, validEmail, setEmail] = useFormInput(emailValidator);
  const [password, validPassword, setPassword] = useFormInput(passwordValidator);

  useEffect(() => {
    if (!state.auth.isLoading) {
      const timeout = setTimeout(() => setValidated(false), 3500);
      return () => clearTimeout(timeout);
    }
    return () => null;
  }, [state.auth.isLoading]);

  const credentials: IAuthCredentials = {
    email: email as string,
    password: password as string,
    name: username as string,
  };
  const isRegister: boolean = type === AuthFormTypes.REGISTER;
  const isRecover: boolean = type === AuthFormTypes.RECOVER;
  const isLogin: boolean = type === AuthFormTypes.LOGIN;
  let success = false;
  if (isLogin) {
    success = state.auth.isAuthenticated;
  } else if (isRegister) {
    success = state.auth.isRegistered;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity()) {
      submitHandler(credentials);
    }
    setValidated(true);
  };

  return (
    <div className="auth-form-wrapper">
      <img id="logo-image" src={BookingAppLogo} alt="Booking app logo" />
      {state.auth.message && validated && (
        <Flash success={success} message={state.auth.message} />
      )}
      <Form noValidate validated={validated} id="auth-form" onSubmit={handleSubmit}>
        {isRegister && (
          <FormInput
            inputFor="username"
            type="text"
            label="Your name"
            value={username as string}
            placeholder="Enter your name"
            feedback="Your name is required"
            isValid={validUsername as boolean}
            changeHandler={setUsermame as Dispatch<SetStateAction<string>>}
          />
        )}
        <FormInput
          inputFor="email"
          type="email"
          label="Your email"
          value={email as string}
          placeholder="Enter your email"
          feedback="Your email is required"
          isValid={validEmail as boolean}
          changeHandler={setEmail as Dispatch<SetStateAction<string>>}
        />

        {!isRecover && (
          <FormInput
            inputFor="password"
            type="password"
            label="Your password"
            value={password as string}
            placeholder="Enter your password"
            feedback="Password must have at least 8 characters"
            isValid={validPassword as boolean}
            changeHandler={setPassword as Dispatch<SetStateAction<string>>}
          />
        )}

        <Button type="submit" variant="primary" className="submit-button" disabled={state.auth.isLoading}>
          {!state.auth.isLoading && type}
          {state.auth.isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </Form>
    </div>
  );
};

export default AuthForm;
