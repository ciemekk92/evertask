import React from 'react';
import { useTranslation } from 'react-i18next';
import { DOTS, usePagination } from 'Hooks/usePagination';
import {
  StyledRow,
  StyledDotsButton,
  StyledNextButton,
  StyledPaginationButton,
  StyledPaginationButtonsContainer,
  StyledPaginationContainer,
  StyledPaginationLabel,
  StyledPreviousButton
} from './Pagination.styled';

interface Props {
  paginationProps: Util.PaginationProps;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ paginationProps, onPageChange }: Props): Nullable<JSX.Element> => {
  const { t } = useTranslation();

  const paginationRange = usePagination({ paginationProps, siblingCount: 2 });
  if (paginationRange!.length < 2) {
    return null;
  }

  const onPageChangeFactory = (page: number) => () => {
    onPageChange(page);
  };

  const onNext = () => {
    onPageChange(paginationProps.currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(paginationProps.currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 2];

  return (
    <StyledRow>
      <StyledPaginationContainer>
        <StyledPaginationLabel>
          {t('pagination.page', {
            page: paginationProps.currentPage + 1,
            of: paginationProps.totalPages
          })}
        </StyledPaginationLabel>
        <StyledPaginationButtonsContainer>
          <StyledPreviousButton disabled={paginationProps.currentPage === 0} onClick={onPrevious} />
          {paginationRange!.map((pageNumber: number | string) => {
            if (pageNumber === DOTS) {
              return <StyledDotsButton key={pageNumber} />;
            }

            return (
              <StyledPaginationButton
                selected={pageNumber === paginationProps.currentPage}
                onClick={onPageChangeFactory((pageNumber as number) - 1)}
                key={pageNumber}
              >
                {pageNumber}
              </StyledPaginationButton>
            );
          })}
          <StyledNextButton disabled={paginationProps.currentPage === lastPage} onClick={onNext} />
        </StyledPaginationButtonsContainer>
      </StyledPaginationContainer>
    </StyledRow>
  );
};
