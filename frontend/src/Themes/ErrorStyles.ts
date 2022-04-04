import { css } from 'styled-components';

export const errorBorderCss = css`
  border: 1px solid ${(props) => props.theme.error};
  outline: none;

  &:focus,
  &:active {
    border: 1px solid ${(props) => props.theme.error};
    outline: none;
  }
`;
