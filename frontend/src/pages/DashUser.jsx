import { useState, useEffect } from 'react';
import Logout from '../components/Logout';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { createTransaction, getTransactions } from '../services/api';
import '../styles/general.css'; // Import your general styles
import logo from '../pics/logo.png';

const UserDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        const transactionsData = response.data;

        const transactionsArray = Object.values(transactionsData).map((transaction) => ({
          ...transaction,
          outputMap: Object.fromEntries(
            Object.entries(transaction.outputMap).map(([key, value]) => [key, Number(value)])
          ),
        }));
        setTransactions(transactionsArray);
      } catch (error) {
        setError('Error fetching transactions');
      }
    };

    fetchTransactions();
  }, []);

  const handleCreateTransaction = async (data) => {
    try {
      await createTransaction(data);
      const response = await getTransactions();
      const updatedTransactionsData = response.data;
      const updatedTransactions = Object.values(updatedTransactionsData).map((transaction) => ({
        ...transaction,
        outputMap: Object.fromEntries(
          Object.entries(transaction.outputMap).map(([key, value]) => [key, Number(value)])
        ),
      }));
      setTransactions(updatedTransactions);
    } catch (error) {
      setError('Error creating transaction');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
      <img src={logo} alt="Logo" className="logo" />
        <h1 className="dashboard-title">User Dashboard</h1>
      </header>
      <Logout />

      <TransactionForm onCreate={handleCreateTransaction} />

      {error && <p className="error-message">{error}</p>}

      <TransactionList transactions={transactions} />

    
    </div>
  );
};

export default UserDashboard;
