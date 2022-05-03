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

type DropdownOption = { value: string; label: string };

interface Props {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

export const SingleSelectDropdown = ({ options, onChange, value }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = React.useState<string>(
    options.find((option) => option.value === value)?.label ?? ''
  );

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setSelectedLabel(options.find((option) => option.value === value)?.label ?? '');
  }, [value]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelectingOption = (option: DropdownOption) => () => {
    onChange(option.value);
    setSelectedLabel(option.label);

    setIsOpen(false);
  };

  useOutsideClick(containerRef, () => setIsOpen(false));

  return (
    <StyledDropdownContainer ref={containerRef}>
      <StyledDropdownButton title={selectedLabel} isOpen={isOpen} onClick={toggleOpen}>
        <StyledDropdownLabelContainer>{selectedLabel}</StyledDropdownLabelContainer>
        <IconFilled iconName="chevron_right" />
      </StyledDropdownButton>
      {isOpen && (
        <StyledDropdownOptionsList>
          {options.map((option: DropdownOption) => (
            <StyledDropdownOption
              title={option.label}
              isOpen={isOpen}
              key={value}
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
