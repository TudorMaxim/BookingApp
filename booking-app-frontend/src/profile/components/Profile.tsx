import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { useStore } from '../../context/store';
import authService from '../../service/auth.service';

const Profile: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  return (
    <>
      <h3>
        Profile for
        {' '}
        {state.profile.name}
      </h3>
      <Button variant="primary" onClick={() => authService.logout(dispatch)}> LOG OUT </Button>
    </>
  );
};

export default Profile;
