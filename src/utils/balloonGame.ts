type TwoDimensionGrid = number[][]
type TwoDimensionBooleanGrid = boolean[][]
type Balloon = {
  x: number
  y: number
}
type Balloons = Balloon[]

export const createGame = (rows: number, cols: number) => {
  const gameGrid: TwoDimensionGrid = []
  const balloons: Balloons = []

  // Create the gameGrid
  for (let i = 0; i < rows; i++) {
    gameGrid[i] = new Array(cols).fill(0)
  }

  // Create balloons and append to the gameGrid
  const fillGridWithBalloons = (): void => {
    let balloonId = 0
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (Math.random() < 0.5) {
          gameGrid[x][y] = 1
          balloons.push({ x: x, y: y })
          balloonId++
        }
      }
    }
  }

  // Implement Depth-First Search Algorithm to locate balloons
  const findConnectedBalloons = (
    x: number,
    y: number,
    visited: TwoDimensionBooleanGrid,
    balloonLocations: Balloons
  ) => {
    if (
      x < 0 ||
      x >= rows ||
      y < 0 ||
      y >= cols ||
      gameGrid[x][y] !== 1 ||
      visited[x][y]
    ) {
      return
    }

    visited[x][y] = true
    balloonLocations.push({ x: x, y: y })

    findConnectedBalloons(x + 1, y, visited, balloonLocations)
    findConnectedBalloons(x - 1, y, visited, balloonLocations)
    findConnectedBalloons(x, y + 1, visited, balloonLocations)
    findConnectedBalloons(x, y - 1, visited, balloonLocations)
  }

  const findAllConnectedBalloons = (): Balloons[] => {
    const visited: TwoDimensionBooleanGrid = []
    const sequences: Balloons[] = []

    for (let i = 0; i < rows; i++) {
      visited[i] = new Array(cols).fill(false)
    }

    for (let i = 0; i < balloons.length; i++) {
      const { x, y } = balloons[i]
      if (!visited[x][y]) {
        const balloonLocations: Balloons = []
        findConnectedBalloons(x, y, visited, balloonLocations)
        sequences.push(balloonLocations)
      }
    }

    return sequences.sort(function (a, b) {
      return b.length - a.length
    })
  }

  fillGridWithBalloons()
  const connectedSequences = findAllConnectedBalloons()
  console.log('gameGrid : ', gameGrid)
  console.log('balloons : ', balloons)
  console.log('connectedSequences : ', connectedSequences)

  return { gameGrid, balloons, connectedSequences }
}

/** gameGrid example
[
 [0, 0, 1, 1, 0] 
 [0, 1, 1, 1, 1] 
 [0, 0, 1, 1, 0] 
 [1, 0, 1, 0, 0] 
 [1, 1, 0, 1, 1]
]
*/

/** balloonLocations example
[
  {x: 0, y: 2} first ROW from the top, Third COL from the left
  {x: 0, y: 3}
  {x: 1, y: 1}
  {x: 1, y: 2}
  {x: 1, y: 3}
  {x: 1, y: 4}
  {x: 2, y: 2}
  {x: 2, y: 3}
  {x: 3, y: 0}
  {x: 3, y: 2}
  {x: 4, y: 0}
  {x: 4, y: 1}
  {x: 4, y: 3}
  {x: 4, y: 4}
]
*/

/** connectedSequences example
[
  [ 
    {x: 0, y: 2},
    {x: 1, y: 2},
    {x: 2, y: 2},
    {x: 3, y: 2},
    {x: 2, y: 3},
    {x: 1, y: 3},
    {x: 0, y: 3},
    {x: 1, y: 4},
    {x: 1, y: 1} 
  ],
  [ 
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 4, y: 1}
  ],
  [ 
    {x: 4, y: 3},
    {x: 4, y: 4}
  ]
]
 */
