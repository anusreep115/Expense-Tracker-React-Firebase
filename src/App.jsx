
import { useEffect, useState } from 'react';
import './App.css'
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from './components/Auth';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import Addexpense from './components/Addexpense';
import AddIncome from './components/AddIncome';





function App() {
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [showAdd, setShowAdd] = useState(false);
const [showIncome, setShowIncome] = useState(false);


useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (u) => {
setUser(u);
setLoading(false);
});
return () => unsubscribe();
}, []);


if (loading) return <p>Loading...</p>
  

  return (
    <>
    <div className="p-6 bg-gray-600 min-h-screen">
<header className="flex justify-between p-4 shadow border border-gray-100 mb-4 rounded">
<h1 className="text-2xl font-bold text-gray-100">Expense Tracker</h1>
{user && (
<div className="flex items-center gap-4">
<span className='text-gray-100'>{user.email}</span>
<button style={{backgroundColor:'#40E0D0', color:'black'}} onClick={() => signOut(auth)} className="border px-3 py-1 rounded">Logout</button>
</div>
)}
</header>


{!user ? (
  <div className="min-h-screen flex items-center justify-center">
<Auth />
</div>
) : (
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="md:col-span-2 space-y-4">
<button onClick={() => setShowAdd(!showAdd)} style={{backgroundColor:'#40E0D0',color:'black'}} className="px-4 py-2 bg-indigo-600 text-white rounded">

{showAdd ? "Close" : "Add Expense"}
</button>



{showAdd && <Addexpense user={user} closeForm={() => setShowAdd(false)}/>}

<button
  onClick={() => setShowIncome(!showIncome)}
  className="px-4 py-2 rounded"
  style={{ backgroundColor: "#40E0D0", color: "black",marginLeft:'20px' }}
>
  {showIncome ? "Close Income" : "Add Income"}
</button>

{showIncome && <AddIncome user={user} closeForm={() => setShowIncome(false)} />}


<ExpenseList user={user} />
</div>


<Summary user={user} />
</div>
)}
</div>
      
    </>
  )
}

export default App
