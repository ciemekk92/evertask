import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonFilled } from '../Buttons';
import { StyledFileInput } from './FileInput.styled';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export const FileInput = ({ onChange, label }: Props): JSX.Element => {
  const { t } = useTranslation();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <React.Fragment>
      <ButtonFilled onClick={handleClick}>{label || t('general.upload')}</ButtonFilled>
      <StyledFileInput
        type="file"
        id="file-upload"
        ref={inputRef}
        onChange={onChange}
        accept="image/*"
      />
    </React.Fragment>
  );
};
