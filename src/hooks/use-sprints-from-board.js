import { useEffect, useState } from "@forge/ui";
import api, { route } from "@forge/api";

export const useSprintsFromBoard = (boardId) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [sprints, setSprints] = useState([]);

  useEffect(() => {
    if (boardId === undefined) return;

    setLoading(true);
    setErrors([]);

    console.log("boardId", boardId);

    const fetchSprints = async () => {
      try {
        console.log("route", route`/rest/agile/1.0/board/${boardId}/sprint?state=active,closed`)
        const response = await api.asUser().requestJira(route`/rest/agile/1.0/board/${boardId}/sprint?state=active,closed`);

        console.log("response", response);
        const data = await response.json();
        console.log("data", data);
        if (response.status >= 400) {
          if (data.errorMessages && data.errorMessages.length > 0) {
            setSprints([]);
            setErrors(data.errorMessages.map((message) => ({ message })));
          } else {
            throw new Error(`Invalid response code: ${response.status}`);
          }
        } else {
          const sprints = data.values.map((sprint) => {
            return {
              id: sprint.id,
              self: sprint.self,
              state: sprint.state,
              name: sprint.name,
              startDate: sprint.startDate,
              endDate: sprint.endDate,
              completeDate: sprint.completeDate,
              originBoardId: sprint.originBoardId,
              goal: sprint.goal,
            };
          });

          setSprints(sprints);
        }
      } catch (error) {
        console.error("Could not fetch issues", error);
        setIssues([]);
        setErrors([{ message: "Could not fetch issues" }]);
      } finally {
        setLoading(false);
      }
    }

    fetchSprints();

  }, [boardId]);


  return { 
    loading, 
    errors, 
    sprints 
  };
};