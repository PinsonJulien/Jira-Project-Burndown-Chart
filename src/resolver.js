import { resolver } from "@forge/resolver";
import { fetchSprints, fetchStoryPoints } from "./utils/fetchData";

const resolverFunction = resolver.define(async ({ payload }) => {
  switch (payload.action) {
    case "fetchSprints":
      return await fetchSprints(payload.projectId);
    case "fetchStoryPoints":
      return await fetchStoryPoints(payload.sprintId);
    default:
      throw new Error("Unknown action");
  }
});

export default resolverFunction;