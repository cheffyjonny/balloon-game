type TwoDimensionGrid = number[][]
type TwoDimensionBooleanGrid = boolean[][]
type Locations = [number, number][]

export const createGame = (rows: number, cols: number) => {
  const gameGrid: TwoDimensionGrid = []
  const balloonLocations: Locations = []

  // Create the gameGrid
  for (let i = 0; i < rows; i++) {
    gameGrid[i] = new Array(cols).fill(0)
  }

  // Create balloons and append to the gameGrid
  const fillGridWithBalloons = (): void => {
    for (let x = 1; x < rows; x++) {
      for (let y = 1; y < cols; y++) {
        if (Math.random() < 0.5) {
          gameGrid[x][y] = 1
          balloonLocations.push([x, y])
        }
      }
    }
  }

  // Implement Depth-First Search Algorithm to locate balloons
  const findConnectedBalloons = (
    x: number,
    y: number,
    visited: TwoDimensionBooleanGrid,
    points: Locations
  ) => {
    if (
      x < 0 ||
      x >= rows ||
      y < 0 ||
      y >= cols ||
      gameGrid[x][y] !== 1 ||
      visited[x][y]
    )
      return

    visited[x][y] = true
    points.push([x, y])

    findConnectedBalloons(x + 1, y, visited, points)
    findConnectedBalloons(x - 1, y, visited, points)
    findConnectedBalloons(x, y + 1, visited, points)
    findConnectedBalloons(x, y - 1, visited, points)
  }

  const findAllConnectedBalloons = (): Locations[] => {
    const visited: TwoDimensionBooleanGrid = []
    const sequences: Locations[] = []

    for (let i = 0; i < rows; i++) {
      visited[i] = new Array(cols).fill(false)
    }

    for (let i = 0; i < balloonLocations.length; i++) {
      const [x, y] = balloonLocations[i]
      if (!visited[x][y]) {
        const points: Locations = []
        findConnectedBalloons(x, y, visited, points)
        sequences.push(points)
      }
    }

    return sequences
  }

  fillGridWithBalloons()
  const connectedSequences = findAllConnectedBalloons()
  return { gameGrid, balloonLocations, connectedSequences }
}

/** gameGrid example
 [
  [ 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 1 ],
  [ 0, 1, 1, 0, 0, 0 ],
  [ 0, 0, 0, 1, 1, 1 ],
  [ 0, 0, 0, 1, 1, 0 ]
]
*/

/** balloonLocations example
[
  [ 2, 5 ], [ 3, 1 ],
  [ 3, 2 ], [ 4, 3 ],
  [ 4, 4 ], [ 4, 5 ],
  [ 5, 3 ], [ 5, 4 ]
]
*/

/** connectedSequences example
[
  [ [ 2, 5 ] ],
  [ [ 3, 1 ], [ 3, 2 ] ],
  [ [ 4, 3 ], [ 5, 3 ], [ 5, 4 ], [ 4, 4 ], [ 4, 5 ] ]
]
 */
