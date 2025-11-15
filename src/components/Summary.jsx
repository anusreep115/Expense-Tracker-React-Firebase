import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';


function Summary({ user }) {
  const [total, setTotal] = useState(0);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }));

       // Total Expense
    const totalExp = data
      .filter(item => item.type !== "income")
      .reduce((sum, item) => sum + Number(item.amount), 0);

    // Total Income
    const totalInc = data
      .filter(item => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount), 0);

      setTotal(totalExp); // old total can be removed if needed
    setRecentExpenses(data.slice(0, 5));

    setTotals({ income: totalInc, expense: totalExp });

      // ---- Total Expense ----
      // const totalAmount = data.reduce((sum, exp) => sum + Number(exp.amount), 0);
      // setTotal(totalAmount);

      // ---- Show last 5 expenses in summary ----
      setRecentExpenses(data.slice(0, 5));
      // If you want all, use: setRecentExpenses(data);
    });

    return () => unsub();
  }, [user]);

  const formatDate = (dateObj) => {
    if (!dateObj) return "";
    const date = dateObj.seconds
      ? new Date(dateObj.seconds * 1000)
      : new Date(dateObj);
    return date.toLocaleDateString();
  };


  return (
    <>
     <div className="gray-box p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-3">Summary</h2>

      {/* Total Expense */}
      {/* <div className="text-xl font-bold text-indigo-700 mb-4">
        Total Expense: ₹ {total.toFixed(2)}
      </div> */}

      {/* Recent Expenses */}
      {/* <h3 className="font-semibold mb-2">Recent Expenses</h3> */}

      {/* {recentExpenses.length === 0 ? (
        <p className="text-sm text-gray-300">No expenses available.</p>
      ) : (
        <ul className="space-y-2">
          {recentExpenses.map((exp) => (
            <li
              key={exp.id}
              className="border p-2 rounded flex justify-between text-sm"
            >
              <div>
                <div className="font-medium">{exp.category}</div>
                <div className="text-gray-500">{formatDate(exp.date)}</div>
              </div>
              <div className="font-semibold">₹ {Number(exp.amount).toFixed(2)}</div>
            </li>
          ))}
        </ul>
      )} */}

      <div>Total Income: ₹ {totals.income.toFixed(2)}</div>
  <div>Total Expense: ₹ {totals.expense.toFixed(2)}</div>
  <div>Balance: ₹ {(totals.income - totals.expense).toFixed(2)}</div>
    </div>
    
      
    </>
  )
}

export default Summary
