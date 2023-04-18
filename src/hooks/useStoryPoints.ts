import { useEffect, useState } from '@forge/ui'
import { invoke } from '@forge/bridge';

const useStoryPoints = (sprintId) => {
  const [storyPoints, setStoryPoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data:any = await invoke('fetchStoryPoints', { sprintId });
      setStoryPoints(data);
    };
    fetchData();
  }, [sprintId]);

  return storyPoints;
};