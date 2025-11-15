import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import ExpenseItem from './ExpenseItem';



function ExpenseList({ user }) {

    const [expenses, setExpenses] = useState([]);


    useEffect(() => {
  const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
  );

  const unsub = onSnapshot(q, (snapshot) => {
      const allData = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      const onlyExpenses = allData.filter(item => item.type !== "income"); // ✅ filter out income
      setExpenses(onlyExpenses);
  });

  return () => unsub();
}, [user]);

    return (
        <>
            <div className="gray-box p-4 rounded shadow">
                <h2 className="font-semibold mb-3">Your Expenses</h2>
                {expenses.length === 0 ? (
                    <p>No expenses added.</p>
                ) : (
                    expenses.map((ex) => <ExpenseItem key={ex.id} expense={ex} />)
                )}
            </div>

        </>
    )
}

export default ExpenseList
