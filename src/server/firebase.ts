import { initializeApp } from 'firebase/app'
import { getFirestore, addDoc, getDocs, collection } from '@firebase/firestore'
import { doc, deleteDoc } from 'firebase/firestore'

interface Game {
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

// Init Firebase App
const app = initializeApp(firebaseConfig)

// Init Services
const fireStore = getFirestore(app)

// Collection Ref
const fireStoreRef = collection(fireStore, 'game')

getDocs(fireStoreRef)
  .then((snapshot) => {
    console.log(snapshot.docs)
  })
  .catch((error) => {
    console.error('Error fetching documents: ', error.message)
  })

export const getGame = async () => {
  const querySnapshot = await getDocs(fireStoreRef)

  if (!querySnapshot || querySnapshot.empty) {
    return null // Return null if querySnapshot is null or empty
  }

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
    gameGrid: game.gameGrid,
    connectedSequences: game.connectedSequences,
  })
}

export const deleteGame = async (id: string) => {
  console.log(id)
  await deleteDoc(doc(fireStore, 'game', id))
}
