import { LocationType } from './classes/Location';
import metadata from './metadata/data';

// path is never empty because it starts with ['sagittarius']
function generateReachableNeighbors(path: string[]): string[] {
  const current = path[path.length - 1];
  if (metadata[current].location.type !== LocationType.TimePortal) {
    let neighbors = metadata[current].neighbors;
    neighbors.push(current);
    return neighbors;
  }
  return metadata[current].neighbors;
}

// location-id to dictionary { ship_id: can_visit_this location }
export type SpaceshipNextMoves = {
  [location: string]: { gemini1: boolean, gemini2: boolean }
};

export function computeNextMoves(spaceshipPaths: { gemini1: string[], gemini2: string[] }): SpaceshipNextMoves {
  let nextMoves: SpaceshipNextMoves = {};
  const reachableNeighbors1 = generateReachableNeighbors(spaceshipPaths.gemini1);
  const reachableNeighbors2 = generateReachableNeighbors(spaceshipPaths.gemini2);
  reachableNeighbors1.forEach((location: string) => {
    if (!nextMoves[location]) {
      nextMoves[location] = { gemini1: false, gemini2: false };
    }
    nextMoves[location].gemini1 = true;
  });
  reachableNeighbors2.forEach((location: string) => {
    if (!nextMoves[location]) {
      nextMoves[location] = { gemini1: false, gemini2: false };
    }
    nextMoves[location].gemini2 = true;
  });
  return nextMoves;
}
