import React, { useState } from 'react'
import { db } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';


function ExpenseItem({ expense }) {

  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState(expense.amount || "");
  const [note, setNote] = useState(expense.note || "");
  const [category, setCategory] = useState(expense.category || "Other");
  const [saving, setSaving] = useState(false);


  const CATEGORIES = ["Food", "Travel", "Shopping", "Rent", "Utilities", "Entertainment", "Other"];


  const saveChanges = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "expenses", expense.id), {
        amount: Number(amount),
        note,
        category,
      });
      setEditing(false);
    } catch (err) {
      alert(err.message || "Failed to save");
    }
    setSaving(false);
  };


  const removeExpense = async () => {
    if (window.confirm("Delete this expense?")) {
      try {
        await deleteDoc(doc(db, "expenses", expense.id));
      } catch (err) {
        alert(err.message || "Failed to delete");
      }
    }
  };

  return (
    <>
      <div className="border-b py-2 flex justify-between items-center">
        {editing ? (
          <div className="flex-1">
            <div className="flex gap-2 items-center">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="border px-2 py-1 rounded">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border px-2 py-1 rounded w-28"
                placeholder="Amount"
              />
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="border px-2 py-1 rounded flex-1"
                placeholder="Note"
              />
              <button onClick={saveChanges} disabled={saving} className="ml-2 px-3 py-1 rounded bg-green-600 text-white">
                {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setEditing(false)} className="ml-2 px-3 py-1 rounded border">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-between">
            <div>
              <div className="font-medium">{expense.category} • ₹ {Number(expense.amount).toFixed(2)}</div>
              {expense.note && <div className="text-sm text-gray-600">{expense.note}</div>}
              {expense.date && (
                <div className="text-xs text-gray-500">{new Date(expense.date.seconds ? expense.date.seconds * 1000 : expense.date).toLocaleDateString()}</div>
              )}
            </div>


            <div className="flex gap-2">
              <button style={{ backgroundColor: 'orange', color: 'white' }} onClick={() => setEditing(true)} className="px-3 py-1 rounded border text-sm">Edit</button>
              <button style={{ backgroundColor: 'red', color: 'white' }} onClick={removeExpense} className="px-3 py-1 rounded border text-sm text-red-600">Delete</button>
            </div>
          </div>
        )}
      </div>


    </>
  )
}

export default ExpenseItem
