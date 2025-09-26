import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

async function testWrite() {
  try {
    await setDoc(doc(db, "debug", "test1"), { hello: "world" });
    console.log("✅ Firestore write succeeded");
  } catch (e) {
    console.error("❌ Firestore write failed", e);
  }
}

testWrite();
