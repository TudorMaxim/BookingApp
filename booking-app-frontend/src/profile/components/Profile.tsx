import {
  ChangeEvent, FormEvent, FunctionComponent, useRef,
} from 'react';
import { Form } from 'react-bootstrap';
import { useStore } from '../../context/store';
import authService from '../../service/auth.service';
import profileService from '../../service/profile.service';
import imagesService from '../../service/images.service';
import { updateImage, updateInput } from '../actions';
import Flash from '../../common/components/Flash';
import StatefulButton from '../../common/components/StatefulButton';
import DefaultProfileImage from '../../assets/DefaultProfileImage.png';
import FormInput from '../../common/components/FormInput';
import '../styles/Profile.sass';

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
          <FormInput
            type="text"
            label="Name"
            value={name}
            pattern="^[a-zA-Z\s]*$"
            validationMessage="Your name must contain only letters!"
            onChange={(e) => dispatch(updateInput('name', e.target.value))}
          />
          <FormInput
            type="text"
            label="Company"
            value={company || ''}
            onChange={(e) => dispatch(updateInput('company', e.target.value))}
          />
          <FormInput
            as="textarea"
            rows={5}
            label="Description"
            value={description || ''}
            onChange={(e) => dispatch(updateInput('description', e.target.value))}
          />
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
