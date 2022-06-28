import styled from 'styled-components';

export const StyledEmptySectionContainer = styled.div`
  border: 1px dashed ${(props) => props.theme.textOnPrimary};
  border-radius: 0.3rem;
  padding: 0.6rem 1rem;
  font-size: 1.8rem;
  text-align: center;
`;
