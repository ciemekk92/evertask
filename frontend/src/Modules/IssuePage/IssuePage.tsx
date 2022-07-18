import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Issue } from 'Types/Issue';
import { ApiResponse } from 'Types/Response';
import { Api } from 'Utils/Api';

export const IssuePage = (): Nullable<JSX.Element> => {
  const params = useParams<RouterParams>();
  const { t } = useTranslation();
  const [issueData, setIssueData] = React.useState<Nullable<Issue.IssueFullEntity>>(null);

  React.useEffect(() => {
    Api.get(`issues/${params.id}`)
      .then((response: ApiResponse) => response.json())
      .then((data: Issue.IssueFullEntity) => {
        setIssueData(data);
      });
  }, [params.id]);

  if (!issueData) return null;

  return <div>{issueData.title}</div>;
};
