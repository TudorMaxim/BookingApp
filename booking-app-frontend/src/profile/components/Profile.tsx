import {
  ChangeEvent, FormEvent, FunctionComponent, useRef,
} from 'react';
import { Form } from 'react-bootstrap';
import StatefulButton from '../../common/StatefulButton';
import { useStore } from '../../context/store';
import authService from '../../service/auth.service';
import profileService from '../../service/profile.service';
import imagesService from '../../service/images.service';
import DefaultProfileImage from '../../assets/DefaultProfileImage.png';
import { updateImage, updateInput } from '../actions';
import './Profile.sass';
import Flash from '../../common/Flash';

const Profile: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  const {
    name, company, description, isLoading, hasImage, imageKey, message, success,
  } = state.profile;
  const { token } = state.auth;
  const imageRef = useRef<HTMLInputElement | null>(null);

  let imageSrc = DefaultProfileImage;
  if (hasImage && imageKey) {
    imageSrc = imagesService.getURL(imageKey);
  }

  const onImageChange = (event: ChangeEvent) => {
    event.preventDefault();
    if (!imageRef.current || !imageRef.current.files) {
      return;
    }
    dispatch(updateImage(imageRef.current.files[0]));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    profileService.updateProfile(state.profile, token, dispatch);
  };
  return (
    <>
      {message && success !== undefined
        && <Flash success={success} message={message} className="normal-alert" />}
      <Form className="profile-form" onSubmit={onSubmit}>
        <div className="profile-image-upload">
          <img className="user-profile-image" src={imageSrc} alt="Profile" />
          <input type="file" accept="image/*" ref={imageRef} onChange={onImageChange} />
        </div>
        <div className="profile-form-data">
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
            <Form.Control as="textarea" rows={5} value={description} onChange={(event) => dispatch(updateInput('description', event.target.value))} />
          </Form.Group>
          <StatefulButton type="submit" variant="primary" text="SAVE" isLoading={isLoading} />
          <StatefulButton
            isLoading={false}
            text="LOG OUT"
            variant="danger"
            className="right"
            onClick={() => authService.logout('Logged out successfully!', dispatch)}
          />
        </div>
      </Form>
    </>
  );
};

export default Profile;
