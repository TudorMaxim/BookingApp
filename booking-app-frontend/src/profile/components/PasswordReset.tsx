import { FunctionComponent, useState, FormEventHandler } from 'react';
import { Form } from 'react-bootstrap';
import { useStore } from '../../context/store';
import FormInput from '../../common/components/FormInput';
import StatefulButton from '../../common/components/StatefulButton';
import Flash from '../../common/components/Flash';
import profileService from '../../service/profile.service';

const PasswordReset: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  const {
    id, isLoading, success, message,
  } = state.profile;
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    profileService.resetPassword(id as string, password, passwordConfirmed, dispatch);
  };

  return (
    <div className="reset-password-form-wrapper">
      {message && success !== undefined
        && <Flash success={success} message={message} className="normal-alert reset-password-form" />}
      <Form className="reset-password-form" onSubmit={handleSubmit}>
        <FormInput
          type="password"
          label="New Password"
          value={password}
          placeholder="Set your new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          type="password"
          label="Confirm Password"
          value={passwordConfirmed}
          placeholder="Confirm your new password"
          onChange={(e) => setPasswordConfirmed(e.target.value)}
        />
        <StatefulButton
          className="dashboard-page-button reset-password-form"
          type="submit"
          text="SUBMIT"
          isLoading={isLoading}
          variant="primary"
        />
      </Form>
    </div>
  );
};

export default PasswordReset;
