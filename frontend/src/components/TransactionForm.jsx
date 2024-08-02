import { useState } from 'react';
import { createTransaction } from '../services/api';
import '../styles/general.css'; // Import your general styles

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
    <div className="form-container">
      <form onSubmit={handleSubmit} className="transaction-form">
        <h4 className="form-title">Create Transaction</h4>
        <div className="form-group">
          <label>
            Recipient:
            <br />
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              className="form-input"
            />    
          </label>
        </div>
        <div className="form-group">
          <label>
            Amount:
            <br />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="form-input"
            />
          </label>
        </div>
        <button type="submit" className="form-button">Submit</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default TransactionForm;
