import styled, { css } from 'styled-components';

export const StyledFlexContainer = styled.div`
  display: flex;
`;

export const StyledFlexColumnContainer = styled(StyledFlexContainer)`
  flex-direction: column;
`;

export const StyledFlexColumnContainerAlignCenter = styled(StyledFlexColumnContainer)`
  align-items: center;
`;

export const StyledFlexContainerSpaceBetween = styled(StyledFlexContainer)`
  justify-content: space-between;
`;

export const StyledFlexContainerAlignCenter = styled(StyledFlexContainer)`
  align-items: center;
`;

export const StyledFlexContainerAlignCenterSpaceBetween = styled(StyledFlexContainerAlignCenter)`
  justify-content: space-between;
`;

export const StyledFlexContainerAllCenter = styled(StyledFlexContainerAlignCenter)`
  justify-content: center;
`;

export const StyledFlexColumnContainerAllCenter = styled(StyledFlexColumnContainerAlignCenter)`
  justify-content: center;
`;

export const StyledTextEllipsis = css`
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const StyledBadge = css`
  width: 6.2rem;
  height: 2rem;
  padding: 0.3rem 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: default;
  border-radius: 0.3rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
`;
