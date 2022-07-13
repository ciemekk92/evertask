import React from 'react';
import styled from 'styled-components';

interface Props {
  error: string;
}

export const StyledErrorField = styled.div`
  color: ${(props) => props.theme.error};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  white-space: pre-line;
`;

export const ErrorField = ({ error }: Props): Nullable<JSX.Element> => {
  if (error.length) {
    return <StyledErrorField role="presentation">{error}</StyledErrorField>;
  }

  return null;
};
