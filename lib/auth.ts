// lib/auth.ts
"use client"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"
import { auth } from "./firebase"
import { getDatabase, ref, set } from "firebase/database"

export interface UserData {
  name: string
  email: string
  uid: string
  points: string
  createdAt: string
}

async function saveUserToDatabase(user: UserData) {
  const db = getDatabase()
  await set(ref(db, "users/" + user.uid), user)
}

export async function registerWithEmail(name: string, email: string, password: string): Promise<UserData> {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  const user = result.user

  await updateProfile(user, { displayName: name })

  const userData: UserData = {
    name,
    email,
    uid: user.uid,
    points: "300",
    createdAt: new Date().toISOString(),
  }

  await saveUserToDatabase(userData)

  localStorage.setItem("isAuthenticated", "true")
  localStorage.setItem("userData", JSON.stringify(userData))
  window.dispatchEvent(new Event("authStateChanged"))

  return userData
}

export async function loginWithGoogle(): Promise<UserData> {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  const user = result.user

  const userData: UserData = {
    name: user.displayName || "Google User",
    email: user.email || "",
    uid: user.uid,
    points: "300",
    createdAt: new Date().toISOString(),
  }

  await saveUserToDatabase(userData)

  localStorage.setItem("isAuthenticated", "true")
  localStorage.setItem("userData", JSON.stringify(userData))
  window.dispatchEvent(new Event("authStateChanged"))

  return userData
}

export async function loginWithEmail(email: string, password: string): Promise<UserData> {
  const result = await signInWithEmailAndPassword(auth, email, password)
  const user = result.user

  const userData: UserData = {
    name: user.displayName || "User",
    email: user.email || "",
    uid: user.uid,
    points: "300", // Optional: Could fetch from DB instead
    createdAt: new Date().toISOString(),
  }

  localStorage.setItem("isAuthenticated", "true")
  localStorage.setItem("userData", JSON.stringify(userData))
  window.dispatchEvent(new Event("authStateChanged"))

  return userData
}

export async function logout(): Promise<void> {
  await signOut(auth)
  localStorage.removeItem("isAuthenticated")
  localStorage.removeItem("userData")
  window.dispatchEvent(new Event("authStateChanged"))
}

export function getCurrentUser(): UserData | null {
  const userData = localStorage.getItem("userData")
  return userData ? JSON.parse(userData) : null
}

export function isAuthenticated(): boolean {
  return localStorage.getItem("isAuthenticated") === "true"
}
