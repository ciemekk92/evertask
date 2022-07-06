import React from 'react';
import userPlaceholder from 'Assets/user_placeholder.png';
import { CircleContainer, UserImage } from './UserSmallCircle.styled';

interface Props {
  label: string;
  imageSrc?: string;
}

export const UserSmallCircle = ({ label, imageSrc }: Props): JSX.Element => {
  const imageString = imageSrc || userPlaceholder;

  return (
    <CircleContainer>
      <UserImage src={imageString} alt={label} title={label} />
    </CircleContainer>
  );
};
