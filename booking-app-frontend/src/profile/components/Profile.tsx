import { FunctionComponent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStore } from '../../context/store';
import authService from '../../service/auth.service';
import DefaultProfileImage from '../../assets/DefaultProfileImage.png';
import { updateInput } from '../actions';
import './Profile.sass';

const Profile: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  const { name, company, image } = state.profile;
  const imageSrc = image || DefaultProfileImage;
  return (
    <div className="profile-form-wrapper">
      <div className="profile-image-upload">
        <img className="user-profile-image" src={imageSrc} alt="Profile" />
        <Form.Control type="file" onChange={(event) => dispatch(updateInput('image', event.target.value))} />
      </div>
      <Form className="profile-form-data">
        <Form.Group>
          <Form.Label> Name </Form.Label>
          <Form.Control type="text" value={name} onChange={(event) => dispatch(updateInput('name', event.target.value))} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Company </Form.Label>
          <Form.Control type="text" value={company} onChange={(event) => dispatch(updateInput('company', event.target.value))} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Description </Form.Label>
          <Form.Control as="textarea" rows={5} />
        </Form.Group>
        <Button variant="primary" onClick={() => console.log('TODO: Submit new data')}> SAVE </Button>
        <Button variant="danger" className="right" onClick={() => authService.logout(dispatch)}> LOG OUT </Button>
      </Form>
    </div>
  );
};

export default Profile;
