import api, { route } from "@forge/api";
import ForgeUI, { ProjectPage, render, Fragment, Text, useProductContext, useState, useEffect } from "@forge/ui";
import { useBoards } from "./hooks/use-boards";
import { useSprintsFromBoard } from "./hooks/use-sprints-from-board";
import { useSprints } from "./hooks/use-sprints";


const getAllBoardsForProject = async (projectKey) => {
    try {
        console.log('hi ?')
        const response = await api.asUser().requestJira(route`/rest/agile/1.0/board`);
        console.log('response: ' , await response.json());
    } catch(error) {
        console.log("ERRROOOOOOOOOOOOOOOOR: " + error)
    }
  
    if (!response.ok) {
      const errorMessage = `Error fetching boards for project \${projectKey}: \${response.status} \${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  
    const boardsData = await response.json();
    console.log(boardsData);
    return boardsData.values;
  };

const fetchCommentsForIssue = async (issueIdOrKey) => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueIdOrKey}/comment`);

  const data = await res.json();
  return data.comments;
};

const fetchSprintsForBoard = async (boardId) => {
    const res = await api.asApp().requestJira(route`/rest/agile/1.0/board/${boardId}/sprint`);
    const data = await res.json();
    return data.values;
  };

  const fetchBoardForProject = async (projectKeyOrId) => {
    const res = await api.asApp().requestJira(route`/rest/agile/1.0/board?projectKeyOrId=${projectKeyOrId}&type=scrum`);
    const data = await res.json();
    return data.values[0].id; // Assuming there's only one scrum board for the project
  };

  const fetchSprintsForProject = async (projectKeyOrId) => {
    const boardId = await fetchBoardForProject(projectKeyOrId);
    console.log("boardId: ", boardId)
    const sprints = await fetchSprintsForBoard(boardId);
    console.log("sprints: ", sprints)
    return sprints;
  };

const App = () => {

    const [sprints] = useSprints(1);

    console.log(sprints);


    const { platformContext: { projectKey } } = useProductContext();
    //const [sprints, setSprints] = useState([]);

    //const { loading, error, sprints } = useSprintsFromBoard('2');
    //const { loadBoard, errorBoard, boards } = useBoards();

    //console.log("extensionContext: " + JSON.stringify(useProductContext()));
  
    /*useEffect(() => {

      const fetchData = async () => {
        try {
            const result = await fetchSprintsForProject(projectKey);
            setSprints(result);
        } catch (error) {
            console.log("error: " + error)
        }
        const result = await fetchSprintsForProject(projectKey);
        console.log("result: " + result)
        setSprints(result);
      };
  
      fetchData();
    }, [projectKey]);*/
  
    return (
      <Fragment>
        <Text>Hello world!</Text>

      </Fragment>
    );
  };

export const run = render(
    <ProjectPage>
        <App />
    </ProjectPage>
);
