import { initializeApp } from 'firebase/app'
import { getFirestore, addDoc, getDocs, collection } from '@firebase/firestore'
import { doc, deleteDoc } from 'firebase/firestore'

interface Game {
  id: string
  gameGrid: string
  connectedSequences: string
}

const firebaseConfig = {
  apiKey: 'AIzaSyCwnWVHGVOvypQVzw9CDUP_ONKDf1sh3_o',
  authDomain: 'balloon-game-d7d34.firebaseapp.com',
  projectId: 'balloon-game-d7d34',
  storageBucket: 'balloon-game-d7d34.appspot.com',
  messagingSenderId: '711256370013',
  appId: '1:711256370013:web:1763860079e8d74a8bd6b4',
  measurementId: 'G-75V5GD9JRS',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const fireStore = getFirestore(app)
const fireStoreRef = collection(fireStore, 'game')

export const getGame = async () => {
  const querySnapshot = await getDocs(fireStoreRef)

  const game = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      gameGrid: JSON.parse(doc.data().gameGrid),
      connectedSequences: JSON.parse(doc.data().connectedSequences),
    }
  })

  return game
}

export const addGame = async (game: Game) => {
  await addDoc(fireStoreRef, {
    id: game.id,
    gameGrid: game.gameGrid,
    connectedSequences: game.connectedSequences,
  })
}

export const deleteGame = async (id: string) => {
  console.log(id)
  await deleteDoc(doc(fireStore, 'game', id))
}
