import React from 'react';
import userPlaceholder from 'Assets/user_placeholder.png';
import { StyledCircleContainer, StyledUserImage } from './UserCircle.styled';

interface Props {
  label?: string;
  isBigImage?: boolean;
  imageSrc?: Nullable<string>;
}

export const UserCircle = ({ label, imageSrc, isBigImage }: Props): JSX.Element => {
  const imageString = imageSrc || userPlaceholder;

  return (
    <StyledCircleContainer isBigImage={isBigImage}>
      <StyledUserImage src={imageString} alt={label} title={label} />
    </StyledCircleContainer>
  );
};
