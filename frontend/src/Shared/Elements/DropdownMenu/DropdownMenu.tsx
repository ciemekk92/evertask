import React from 'react';
import { useOutsideClick } from 'Hooks/useOutsideClick';
import { IconButton } from '../Buttons';
import { DROPDOWN_MENU_POSITION } from './fixtures';
import { StyledDropdownContainer, StyledDropdownOptionsList } from './DropdownMenu.styled';
import { StyledDropdownOption } from '../SingleSelectDropdown/SingleSelectDropdown.styled';

interface Props {
  options: Util.MenuOption[];
  iconName?: string;
  position?: DROPDOWN_MENU_POSITION;
}

export const DropdownMenu = ({ options, iconName, position }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const onClickFactory =
    (optionCallback: VoidFunctionNoArgs): VoidFunctionNoArgs =>
    () => {
      setIsOpen(false);
      optionCallback();
    };

  useOutsideClick(containerRef, () => setIsOpen(false));

  return (
    <StyledDropdownContainer isOpen={isOpen} ref={containerRef}>
      <IconButton iconName={iconName || 'more_horiz'} onClick={toggleOpen} />
      {isOpen && (
        <StyledDropdownOptionsList position={position}>
          {options.map((option: Util.MenuOption) => (
            <StyledDropdownOption
              key={option.label}
              isOpen={isOpen}
              title={option.label}
              onClick={onClickFactory(option.onClick)}
            >
              {option.label}
            </StyledDropdownOption>
          ))}
        </StyledDropdownOptionsList>
      )}
    </StyledDropdownContainer>
  );
};
