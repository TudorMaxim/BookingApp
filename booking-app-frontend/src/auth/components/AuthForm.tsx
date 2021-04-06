import {
  Dispatch, FormEvent, FunctionComponent,
  SetStateAction, useEffect, useState,
} from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookingAppLogo from '../../assets/BookingAppLogo.png';
import { IAuthCredentials } from '../actions/types';
import FormInput, { useFormInput } from './FormInput';
import { useStore } from '../../context/store';
import { usernameValidator, emailValidator, passwordValidator } from '../validators';
import Flash from '../../common/components/Flash';
import StatefulButton from '../../common/components/StatefulButton';
import '../styles/AuthForm.sass';

export enum AuthFormTypes {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    RECOVER = 'RECOVER'
}

interface AuthFormProps {
  type: AuthFormTypes;
  submitHandler: (credentials: IAuthCredentials) => void;
}

const AuthForm: FunctionComponent<AuthFormProps> = ({ type, submitHandler }): JSX.Element => {
  const { state } = useStore();
  const { isLoading, message, success } = state.auth;
  const [validated, setValidated] = useState(false);
  const [username, validUsername, setUsermame] = useFormInput(usernameValidator);
  const [email, validEmail, setEmail] = useFormInput(emailValidator);
  const [password, validPassword, setPassword] = useFormInput(passwordValidator);

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => setValidated(false), 3500);
      return () => clearTimeout(timeout);
    }
    return () => null;
  }, [isLoading]);

  const credentials: IAuthCredentials = {
    email: email as string,
    password: password as string,
    name: username as string,
  };

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
      {message && success !== undefined && (
        <Flash success={success} message={message} className="form-alert" />
      )}
      <Form noValidate validated={validated} id="auth-form" onSubmit={handleSubmit}>
        {type === AuthFormTypes.REGISTER && (
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

        {type !== AuthFormTypes.RECOVER && (
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
        { type === AuthFormTypes.LOGIN && (
          <Link to="/recover"> Forgot your password? </Link>
        )}
        <StatefulButton
          type="submit"
          variant="primary"
          text={type}
          isLoading={state.auth.isLoading}
          className="submit-button dashboard-page-button"
        />
      </Form>
    </div>
  );
};

export default AuthForm;
