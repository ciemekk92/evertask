import React from 'react';
import styled from 'styled-components';
import { TopPortal } from 'Shared/TopPortal';
import { Preloader } from 'Shared/Preloader';
import { StyledFlexContainerAllCenter } from 'Shared/SharedStyles.styled';

const Overlay = styled(StyledFlexContainerAllCenter)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.surfaceTransparent};
  z-index: 15500;

  & circle {
    z-index: 15501;
  }
`;

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
}

export const LoadingContainer = ({
  isLoading,
  ...props
}: ContainerProps): Nullable<JSX.Element> => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.focus();
  });

  return isLoading ? (
    <TopPortal>
      <Overlay {...props}>
        <Preloader />
      </Overlay>
    </TopPortal>
  ) : null;
};
