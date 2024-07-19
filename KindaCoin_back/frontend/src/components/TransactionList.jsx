
import PropTypes from 'prop-types';

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <strong>Sender:</strong> {transaction.sender} | 
            <strong> Receiver:</strong> {transaction.receiver} | 
            <strong> Amount:</strong> {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      receiver: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionList;
