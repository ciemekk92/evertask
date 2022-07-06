import React from 'react';
import userPlaceholder from 'Assets/user_placeholder.png';
import { CircleContainer, UserImage } from './UserSmallCircle.styled';

interface Props {
  label: string;
  image?: Unrestricted;
}

export const UserSmallCircle = ({ label, image }: Props): JSX.Element => {
  return (
    <CircleContainer>
      <UserImage src={image || userPlaceholder} alt={label} />
    </CircleContainer>
  );
};
