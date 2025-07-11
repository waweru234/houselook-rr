import { getDatabase, ref, set, get, remove, update } from "firebase/database"
import { db } from "./firebase"

const SAVED_PATH = (userId: string) => `users/${userId}/saved`
const TIMESAVED_PATH = (userId: string) => `users/${userId}/timesaved`
const EXPIRATION_MS = 48 * 60 * 60 * 1000 // 48 hours in ms

export async function saveHouse(userId: string, houseId: string): Promise<void> {
  const db = getDatabase()
  const now = Date.now()
  await update(ref(db, `users/${userId}`), {
    [`saved/${houseId}`]: true,
    [`timesaved/${houseId}`]: now,
  })
}

export async function unsaveHouse(userId: string, houseId: string): Promise<void> {
  const db = getDatabase()
  await update(ref(db, `users/${userId}`), {
    [`saved/${houseId}`]: null,
    [`timesaved/${houseId}`]: null,
  })
}

export async function getSavedHouses(userId: string): Promise<string[]> {
  const db = getDatabase()
  const savedSnap = await get(ref(db, SAVED_PATH(userId)))
  const timeSnap = await get(ref(db, TIMESAVED_PATH(userId)))
  const now = Date.now()
  let validIds: string[] = []
  if (savedSnap.exists() && timeSnap.exists()) {
    const saved = savedSnap.val()
    const times = timeSnap.val()
    for (const id of Object.keys(saved)) {
      if (saved[id] && times[id] && now - times[id] < EXPIRATION_MS) {
        validIds.push(id)
      } else {
        // Clean up expired
        await unsaveHouse(userId, id)
      }
    }
  }
  return validIds
}

export async function getUserProperties(userId: string): Promise<any[]> {
  const db = getDatabase()
  const snapshot = await get(ref(db, 'property'))
  if (!snapshot.exists()) return []
  const allProps = snapshot.val()
  return Object.entries(allProps)
    .filter(([_, prop]: any) => prop.UserID === userId)
    .map(([id, prop]: any) => ({ id, ...prop }))
}

export async function getUserPoints(userId: string): Promise<number> {
  const db = getDatabase()
  const pointsSnap = await get(ref(db, `users/${userId}/points`))
  if (pointsSnap.exists()) {
    return Number(pointsSnap.val())
  }
  return 0
}

export async function setUserPoints(userId: string, points: number): Promise<void> {
  const db = getDatabase()
  await set(ref(db, `users/${userId}/points`), points)
}

export async function getAdminStatistics() {
  const db = getDatabase()
  // Try to fetch a statistics node first
  const statsSnap = await get(ref(db, 'statistics'))
  if (statsSnap.exists()) {
    return statsSnap.val()
  }
  // If not present, compute from users and property
  const usersSnap = await get(ref(db, 'users'))
  const propertySnap = await get(ref(db, 'property'))
  const totalUsers = usersSnap.exists() ? Object.keys(usersSnap.val()).length : 0
  const totalProperties = propertySnap.exists() ? Object.keys(propertySnap.val()).length : 0
  // Revenue can be 0 or computed if you have a revenue node
  let totalRevenue = 0
  const revenueSnap = await get(ref(db, 'revenue'))
  if (revenueSnap.exists()) {
    totalRevenue = Number(revenueSnap.val())
  }
  return {
    totalUsers,
    totalProperties,
    totalRevenue,
  }
} 