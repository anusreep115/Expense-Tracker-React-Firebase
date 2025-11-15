import React, { useState } from 'react'
import { db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'



function AddIncome({ user, closeForm }) {
    const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const addIncome = async (e) => {
  e.preventDefault();
  if (!user) {
    alert("User not logged in");
    return;
  }
  if (!amount) return;

  try {
    await addDoc(collection(db, "expenses"), {
      userId: user.uid,
      amount: Number(amount),
      note,
      date: new Date(),
      type: "income",
      createdAt: serverTimestamp(),
    });
    closeForm();
    setAmount("");
    setNote("");
  } catch (err) {
    alert(err.message || "Failed to add income");
  }
};

  return (
    <>
     <form
      onSubmit={addIncome}
      className="p-4 rounded shadow space-y-3"
      style={{ backgroundColor: "#2e2e2e", color: "#ffffff" }} // gray box
    >
      <h2 className="text-lg font-semibold text-white mb-2">Add Income</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        style={{ backgroundColor: "#1f1f1f", color: "#fff", borderColor: "#444" }}
        required
      />

      <input
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        style={{ backgroundColor: "#1f1f1f", color: "#fff", borderColor: "#444" }}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 rounded"
        style={{ backgroundColor: "#40E0D0", color: "black", border: "none" }} // turquoise button
      >
        Add Income
      </button>
    </form>
      
    </>
  )
}

export default AddIncome
