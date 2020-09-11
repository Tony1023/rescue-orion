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
  [location: string]: { [id: string]: boolean }
};

export function computeNextMoves(data: {
  spaceships: {
    [id: string]: string[]
  },
}): SpaceshipNextMoves {
  let nextMoves: SpaceshipNextMoves = {};
  for (const spaceship in data.spaceships) {
    const reachableNeighbors = generateReachableNeighbors(data.spaceships[spaceship]);
    reachableNeighbors.forEach((location: string) => {
      if (!nextMoves[location]) {
        nextMoves[location] = { gemini1: false, gemini2: false };
      }
      nextMoves[location][spaceship] = true;
    });
  }
  return nextMoves;
}
