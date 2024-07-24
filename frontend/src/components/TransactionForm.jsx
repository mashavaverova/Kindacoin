import { useState } from 'react';
import { createTransaction } from '../services/api';

const TransactionForm = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const transactionData = { recipient, amount };
      await createTransaction(transactionData);
      setRecipient('');
      setAmount('');
      setError(''); 
    } catch (error) {
      setError('Error submitting transaction: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Transaction</h2>
      <div>
        <label>
          Recipient:
          <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>
      </div>
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default TransactionForm;
