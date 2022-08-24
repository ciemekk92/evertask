import styled from 'styled-components';
import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isBigImage?: boolean;
}

export const StyledCircleContainer = styled.div<ContainerProps>`
  min-width: ${(props) => (props.isBigImage ? '20rem' : '3rem')};
  width: ${(props) => (props.isBigImage ? '20rem' : '3rem')};
  height: ${(props) => (props.isBigImage ? '20rem' : '3rem')};
  border-radius: 50%;
  z-index: 5;
`;

export const StyledUserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
