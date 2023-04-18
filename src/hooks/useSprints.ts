import { useEffect, useState } from '@forge/ui'
import { invoke } from '@forge/bridge';

export const useSprints = (projectId) => {
  const [sprints, setSprints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data:any = await invoke('fetchSprints', { projectId });  // await fetchSprints({ projectId });
      setSprints(data);
    };
    
    fetchData();
  }, [projectId]);

  return sprints;
};