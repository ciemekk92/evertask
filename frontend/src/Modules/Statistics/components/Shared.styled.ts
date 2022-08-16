import styled from 'styled-components';
import { StyledFlexColumnContainerAlignCenter } from 'Shared/SharedStyles.styled';
import { StyledDropdownContainer } from 'Shared/Elements/SingleSelectDropdown/SingleSelectDropdown.styled';

export const StyledChartContainer = styled(StyledFlexColumnContainerAlignCenter)`
  font-size: 1.6rem;
  padding: 2rem 0;

  & ${StyledDropdownContainer} {
    margin-bottom: 1.5rem;
  }

  & svg {
    overflow: visible;
  }

  & .recharts-rectangle.recharts-tooltip-cursor {
    fill: ${(props) => props.theme.surfaceTransparent};
  }

  & .recharts-text {
    &.recharts-label {
      & tspan {
        fill: ${(props) => props.theme.primaryText};
      }
    }

    &.recharts-cartesian-axis-tick-value {
      & tspan {
        fill: ${(props) => props.theme.secondaryText};
      }
    }
  }

  & .recharts-default-tooltip {
    background-color: ${(props) => props.theme.surface} !important;

    & .recharts-tooltip-label {
      color: ${(props) => props.theme.primaryText};
    }
  }
`;
