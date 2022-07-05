declare global {
  export type Id = string;
  export type Unrestricted = any;
  export type Nullable<T> = null | T;
  export type Maybe<T> = null | undefined | T;
  export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
  export type EmptyArray = never[];
  export type EmptyObject = Record<string, never>;
  export type EmptyString = '';
  export type VoidFunctionNoArgs = () => void;
  export type UiTheme = 'light' | 'dark';
  export type IdentifiedEntity = {
    id: Id;
  };
  export type AuditedEntity = {
    id: Id;
    createdAt: string;
    updatedAt: Nullable<string>;
  };
  export type RouterParams = {
    id: Id;
  };
  export type DropdownOption = {
    value: Nullable<string>;
    label: string;
  };
}

export {};
