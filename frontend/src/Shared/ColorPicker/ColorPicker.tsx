import React from 'react';
import { ACCENT_COLORS } from './fixtures';
import { StyledColorField, StyledColorFieldsContainer } from './ColorPicker.styled';

interface Props {
  selectedColor: string;
  onSelectingColor: (value: string) => void;
  disabled?: boolean;
}

export const ColorPicker = ({ selectedColor, onSelectingColor, disabled }: Props): JSX.Element => {
  const handleSelectingColorFactory = (color: string) => () => {
    if (!disabled) {
      onSelectingColor(color);
    }
  };

  return (
    <StyledColorFieldsContainer>
      {ACCENT_COLORS.map((color: string, index: number) => (
        <StyledColorField
          key={index}
          color={color}
          isActive={selectedColor === color}
          onClick={handleSelectingColorFactory(color)}
        />
      ))}
    </StyledColorFieldsContainer>
  );
};
