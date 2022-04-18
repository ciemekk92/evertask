export type OrganisationPayload = {
  name: string;
  description: string;
};

export type Organisation = IdentifiedEntity & OrganisationPayload;
