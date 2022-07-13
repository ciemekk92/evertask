import React from 'react';
import { useOutsideClick } from 'Hooks/useOutsideClick';
import { IconFilled } from '../Icons';
import {
  StyledDropdownButton,
  StyledDropdownContainer,
  StyledDropdownLabelContainer,
  StyledDropdownOption,
  StyledDropdownOptionsList
} from './SingleSelectDropdown.styled';

interface Props {
  options: DropdownOption[];
  value: Nullable<string>;
  onChange: (value: Unrestricted) => void;
  disabled?: boolean;
}

export const SingleSelectDropdown = ({
  options,
  onChange,
  value,
  disabled
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = React.useState<string>(
    options.find((option) => option.value === value)?.label ?? ''
  );

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setSelectedLabel(options.find((option) => option.value === value)?.label ?? '');
  }, [options, value]);

  const handleOpeningDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSelectingOption = (option: DropdownOption) => () => {
    onChange(option.value);
    setSelectedLabel(option.label);

    setIsOpen(false);
  };

  useOutsideClick(containerRef, () => setIsOpen(false));

  return (
    <StyledDropdownContainer ref={containerRef}>
      <StyledDropdownButton
        disabled={disabled}
        title={selectedLabel}
        isOpen={isOpen}
        onClick={handleOpeningDropdown}
      >
        <StyledDropdownLabelContainer>{selectedLabel}</StyledDropdownLabelContainer>
        <IconFilled iconName="chevron_right" />
      </StyledDropdownButton>
      {isOpen && (
        <StyledDropdownOptionsList>
          {options.map((option: DropdownOption) => (
            <StyledDropdownOption
              title={option.label}
              isOpen={isOpen}
              key={option.value}
              onClick={handleSelectingOption(option)}
            >
              {option.label}
            </StyledDropdownOption>
          ))}
        </StyledDropdownOptionsList>
      )}
    </StyledDropdownContainer>
  );
};
