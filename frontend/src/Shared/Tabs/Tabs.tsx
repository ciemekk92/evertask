import React from 'react';
import { ButtonOutline } from 'Shared/Elements/Buttons';
import { TabPanelProps } from './fixtures';
import { TabsPanel } from './TabsPanel';
import {
  StyledTabsContainer,
  StyledTabsMenuContainer,
  StyledTabsMenuItem,
  StyledTabsNav
} from './Tabs.styled';

interface Props {
  children: React.ReactNode;
  activeTab?: number;
}

interface State {
  activeTab: number;
}

export class Tabs extends React.Component<Props, State> {
  public static Panel = TabsPanel;

  private static defaultProps = {
    activeTab: 0
  };

  public constructor(props: Props) {
    super(props);

    this.state = {
      activeTab: props.activeTab ?? 0
    };
  }

  private get menuItems(): JSX.Element {
    const { children } = this.props;

    if (!children) {
      throw new Error('Tabs must contain at least one Tabs.Panel');
    }

    let newChildren: React.Component<TabPanelProps>[];

    if (!Array.isArray(children)) {
      newChildren = [children as unknown as React.Component<TabPanelProps>];
    } else {
      newChildren = [...children];
    }

    const menuItems = newChildren
      .filter((panel: React.Component<TabPanelProps>) => panel)
      .map((panel: React.Component<TabPanelProps>, index: number) => {
        const { title, disabled } = panel.props;

        return (
          <StyledTabsMenuItem key={index} isActive={index === this.state.activeTab}>
            <ButtonOutline disabled={disabled} onClick={this.handleClickFactory(index, disabled)}>
              {title}
            </ButtonOutline>
          </StyledTabsMenuItem>
        );
      });

    return (
      <StyledTabsNav>
        <StyledTabsMenuContainer>{menuItems}</StyledTabsMenuContainer>
      </StyledTabsNav>
    );
  }

  private get selectedPanel(): JSX.Element {
    const panel = Array.isArray(this.props.children)
      ? this.props.children[this.state.activeTab]
      : this.props.children;

    return <div>{panel}</div>;
  }

  private setActive = (index: number): void => {
    this.setState({ activeTab: index });
  };

  private handleClickFactory =
    (index: number, disabled?: boolean): VoidFunctionNoArgs =>
    () => {
      if (!disabled) {
        this.setActive(index);
      }
    };

  public render(): JSX.Element {
    return (
      <StyledTabsContainer>
        {this.menuItems}
        {this.selectedPanel}
      </StyledTabsContainer>
    );
  }
}
