declare namespace Sprint {
  export type SprintEntity = AuditedEntity & {
    ordinal: number;
    description: string;
    startDate: string;
    finishDate: string;
    projectId: Id;
  };
}
