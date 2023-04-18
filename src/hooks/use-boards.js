import { useEffect, useState } from "@forge/ui";
import api, { route } from "@forge/api";

export const useBoards = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    //if (boardId === undefined) return;

    setLoading(true);
    setErrors([]);

    const fetchBoards = async () => {
      try {
        console.log("route", route`/rest/agile/1.0/board`)
        const response = await api.asApp().requestJira( route`/rest/agile/1.0/board`);

        console.log("response", response.json());
        const data = await response.json();
        console.log("data", data);
        if (response.status >= 400) {
          if (data.errorMessages && data.errorMessages.length > 0) {
            setBoards([]);
            setErrors(data.errorMessages.map((message) => ({ message })));
          } else {
            throw new Error(`Invalid response code: ${response.status}`);
          }
        } else {
          const boards = data.values.map((board) => {
            return {
              id: board.id,
            };
          });

          setBoards(boards);
        }
      } catch (error) {
        console.error("Could not fetch issues", error);
        setIssues([]);
        setErrors([{ message: "Could not fetch issues" }]);
      } finally {
        setLoading(false);
      }
    }

    fetchBoards();

  }, []);


  return { 
    loading, 
    errors, 
    boards, 
  };
};