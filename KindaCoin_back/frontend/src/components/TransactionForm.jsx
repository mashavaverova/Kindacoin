
import { useState } from 'react';
import PropTypes from 'prop-types';

const TransactionForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({ sender: '', receiver: '', amount: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({ sender: '', receiver: '', amount: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Sender</label>
        <input type="text" name="sender" onChange={handleChange} value={formData.sender} required />
      </div>
      <div>
        <label>Receiver</label>
        <input type="text" name="receiver" onChange={handleChange} value={formData.receiver} required />
      </div>
      <div>
        <label>Amount</label>
        <input type="number" name="amount" onChange={handleChange} value={formData.amount} required />
      </div>
      <button type="submit">Create Transaction</button>
    </form>
  );
};

TransactionForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default TransactionForm;
