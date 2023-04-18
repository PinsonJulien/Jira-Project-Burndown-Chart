import api, { route } from '@forge/api';

export const fetchSprints = async (projectId) => {
  const res = await api.asUser().requestJira(route`/rest/agile/1.0/board/\${projectId}/sprint`);
  const data = await res.json();
  return data.values;
};

export const fetchStoryPoints = async (sprintId) => {
  const jql = `Sprint=\${sprintId} AND issuetype=Story`;
  const res = await api.asUser().requestJira(route`/rest/api/3/search?jql=\${jql}&fields=customfield_10002`);
  const data = await res.json();
  return data.issues.map(issue => issue.fields.customfield_10002);
};