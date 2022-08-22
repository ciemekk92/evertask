declare namespace Util {
  export type MenuOptionWithOnClick = {
    label: string | JSX.Element;
    iconName?: string;
    onClick: VoidFunctionNoArgs;
  };

  export type MenuOptionWithSearch = {
    searchable: string;
    label: string | JSX.Element;
    value: Nullable<Id>;
  };
}
