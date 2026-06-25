#!/usr/bin/env node
/**
 * Verifies Firebase Auth + Firestore connectivity using project .env credentials.
 * Creates a temporary test user, writes a users/{uid} doc, reads it back, then deletes both.
 */
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, deleteApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = resolve(root, '.env');

function loadEnv() {
  if (!existsSync(envPath)) throw new Error('.env not found');
  const text = readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of text.split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

const env = loadEnv();
const config = {
  apiKey: env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const suffix = Date.now();
const email = `woofi-verify-${suffix}@mailinator.com`;
const password = `WoofiTest!${suffix}`;

async function main() {
  console.log('🔥 Firebase verification — project:', config.projectId);

  const app = initializeApp(config, 'woofi-verify');
  const auth = getAuth(app);
  const db = getFirestore(app);

  console.log('1/4 Register (Auth)...');
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = credential.user.uid;
  console.log('   ✅ User created:', uid);

  console.log('2/4 Sign out + sign in (Auth)...');
  await signOut(auth);
  await signInWithEmailAndPassword(auth, email, password);
  console.log('   ✅ Login OK');

  console.log('3/4 Write + read users/{uid} (Firestore)...');
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    uid,
    email,
    displayName: 'WOOFI Verify',
    locale: 'es-AR',
    role: 'user',
    notificationSettings: {
      lostNearby: true,
      foundNearby: true,
      transitNearby: true,
      sightings: true,
      adoptionUpdates: true,
      interactions: true,
      pushEnabled: false,
      radiusKm: 10,
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const snap = await getDoc(userRef);
  if (!snap.exists()) throw new Error('Firestore read failed — document not found');
  console.log('   ✅ Firestore read/write OK');

  console.log('4/4 Cleanup test data...');
  await deleteDoc(userRef);
  await deleteUser(auth.currentUser);
  console.log('   ✅ Test user removed');

  await deleteApp(app);
  console.log('\n✅ Firebase Auth + Firestore verification passed');
}

main().catch((err) => {
  console.error('\n❌ Verification failed:', err.message || err);
  if (err.code) console.error('   code:', err.code);
  process.exit(1);
});
