import { ChangeEvent, FunctionComponent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStore } from '../../context/store';
import authService from '../../service/auth.service';
import profileService from '../../service/profile.service';
import DefaultProfileImage from '../../assets/DefaultProfileImage.png';
import { updateImage, updateInput } from '../actions';
import './Profile.sass';

const Profile: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  const {
    name, company, image, imageURL,
  } = state.profile;
  const imageSrc = imageURL || DefaultProfileImage;

  const onImageChange = (event: ChangeEvent) => {
    const { files } = event.target as HTMLInputElement;
    if (!files) {
      return;
    }
    dispatch(updateImage(files[0]));
  };

  const onSubmit = () => {
    profileService.uploadImage(image);
  };

  return (
    <div className="profile-form-wrapper">
      <div className="profile-image-upload">
        <img className="user-profile-image" src={imageSrc} alt="Profile" />
        <Form.Control type="file" accept="image/*" onChange={onImageChange} />
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
        <Button variant="primary" onClick={onSubmit}> SAVE </Button>
        <Button variant="danger" className="right" onClick={() => authService.logout(dispatch)}> LOG OUT </Button>
      </Form>
    </div>
  );
};

export default Profile;
