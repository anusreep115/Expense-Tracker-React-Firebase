import React, { useState } from 'react'
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';


function Addexpense({ user, closeForm }) {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [note, setNote] = useState("");


    const CATEGORIES = ["Food", "Travel", "Shopping", "Rent", "Other"];


    const addExpense = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "expenses"), {
            userId: user.uid,
            amount: Number(amount),
            category,
            note,
            date: new Date(),
            createdAt: serverTimestamp(),
        });
        closeForm();
    };
    return (
        <>
        <div style={{backgroundColor:'#2e2e2e',color:'white'}}>
            <form  onSubmit={addExpense} className="p-4 bg-gray-800 rounded shadow space-y-3">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-gray-800 border px-3 py-2 rounded">
                    {CATEGORIES.map((cat) => (
                        <option key={cat}>{cat}</option>
                    ))}
                </select>


                <input type="number" className="w-full border px-3 py-2 rounded" placeholder="Amount" value={amount} required onChange={(e) => setAmount(e.target.value)} />


                <input className="w-full border px-3 py-2 rounded" placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />


                <button className="px-4 py-2 rounded w-full" style={{backgroundColor:'#40E0D0', color:'black'}}>Add Expense</button>
            </form>
            </div>

        </>
    )
}

export default Addexpense
