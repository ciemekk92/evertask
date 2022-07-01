import React from 'react';
import { useOutsideClick } from 'Hooks/useOutsideClick';
import { IconFilled } from '../Icons';
import { DROPDOWN_MENU_POSITION } from './fixtures';
import { StyledDropdownContainer, StyledDropdownOptionsList } from './DropdownMenu.styled';
import { StyledDropdownOption } from '../SingleSelectDropdown/SingleSelectDropdown.styled';

interface MenuOption {
  label: string;
  iconName?: string;
  onClick: VoidFunctionNoArgs;
}

interface Props {
  options: MenuOption[];
  position?: DROPDOWN_MENU_POSITION;
}

export const DropdownMenu = ({ options, position }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  useOutsideClick(containerRef, () => setIsOpen(false));

  return (
    <StyledDropdownContainer isOpen={isOpen} ref={containerRef}>
      <IconFilled iconName="more_horiz" onClick={toggleOpen} />
      {isOpen && (
        <StyledDropdownOptionsList position={position}>
          {options.map((option: MenuOption) => (
            <StyledDropdownOption
              key={option.label}
              isOpen={isOpen}
              title={option.label}
              onClick={option.onClick}
            >
              {option.label}
            </StyledDropdownOption>
          ))}
        </StyledDropdownOptionsList>
      )}
    </StyledDropdownContainer>
  );
};
