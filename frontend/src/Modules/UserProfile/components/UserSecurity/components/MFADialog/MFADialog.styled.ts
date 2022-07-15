import styled from 'styled-components';

export const StyledDialogContent = styled.div`
  width: 70rem;
`;

export const StyledMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

export const StyledQrWarning = styled.p`
  color: ${(props) => props.theme.error};
`;
