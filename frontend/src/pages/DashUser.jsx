
import { useState, useEffect } from 'react';
import Logout from "../components/Logout";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList"; 
import { createTransaction, getTransactions } from '../services/api';

const UserDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch transactions when the component mounts
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        setError('Error fetching transactions');
      }
    };

    fetchTransactions();
  }, []);

  const handleCreateTransaction = async (data) => {
    try {
      await createTransaction(data);
      // Refresh the transactions list after creating a new transaction
      const updatedTransactions = await getTransactions();
      setTransactions(updatedTransactions);
    } catch (error) {
      setError('Error creating transaction');
    }
  };


    return (
      <div>
        <h1>User Dashboard</h1>
        <p>Welcome, User!</p>


        <TransactionForm onCreate={handleCreateTransaction} />

        {error && <p>{error}</p>}

        <TransactionList transactions={transactions} />

        <Logout />
      </div>
    );
  };
  
  export default UserDashboard;