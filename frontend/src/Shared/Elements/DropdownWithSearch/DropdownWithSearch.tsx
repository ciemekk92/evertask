import React from 'react';
import { useTranslation } from 'react-i18next';
import { useOutsideClick } from 'Hooks/useOutsideClick';
import { IconButton } from '../Buttons';
import { DROPDOWN_MENU_POSITION } from '../DropdownMenu';
import { StyledDropdownOption } from '../SingleSelectDropdown/SingleSelectDropdown.styled';
import {
  StyledDropdownListWithSearchContainer,
  StyledDropdownWithSearchContainer,
  StyledSearchInput
} from './DropdownWithSearch.styled';

interface Props {
  iconName?: string;
  onChange: (id: Nullable<Id>) => void;
  options: Util.MenuOptionWithSearch[];
  position?: DROPDOWN_MENU_POSITION;
}

export const DropdownWithSearch = ({
  iconName,
  onChange,
  options,
  position
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>('');
  const containerRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => setIsOpen(false));

  const onClickFactory = (id: Nullable<Id>) => () => {
    onChange(id);
    setIsOpen(false);
  };

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const filteredOptions = options.filter((option) => {
    return option.searchable.includes(query);
  });

  return (
    <StyledDropdownWithSearchContainer isOpen={isOpen} ref={containerRef}>
      <IconButton iconName={iconName || 'edit'} onClick={toggleOpen} />
      {isOpen && (
        <StyledDropdownListWithSearchContainer position={position}>
          <StyledSearchInput
            type="text"
            onChange={handleInputChange}
            value={query}
            placeholder={t('general.inputPlaceholder')}
          />
          {filteredOptions.map((option: Util.MenuOptionWithSearch, index: number) => (
            <StyledDropdownOption
              key={index}
              isOpen={isOpen}
              title={typeof option.label === 'string' ? option.label : undefined}
              onClick={onClickFactory(option.value)}
            >
              {option.label}
            </StyledDropdownOption>
          ))}
        </StyledDropdownListWithSearchContainer>
      )}
    </StyledDropdownWithSearchContainer>
  );
};
