
import PropTypes from 'prop-types';

const TransactionList = ({ transactions }) => {
  // Handle the case when transactions is not an array
  if (!Array.isArray(transactions)) {
    return <p>No transactions available.</p>;
  }

  return (
    <div>
      <h2>Transaction List</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <div><strong>ID:</strong> {transaction.id}</div>
              <div><strong>Output Map:</strong></div>
              <ul>
                {Object.entries(transaction.outputMap).map(([address, amount]) => (
                  <li key={address}>{address}: {amount}</li>
                ))}
              </ul>
              <div><strong>Input Map:</strong></div>
              <div>Timestamp: {new Date(transaction.inputMap.timestamp).toLocaleString()}</div>
              <div>Amount: {transaction.inputMap.amount}</div>
              <div>Address: {transaction.inputMap.address}</div>
              <div>Signature: {transaction.inputMap.signature}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      outputMap: PropTypes.objectOf(PropTypes.number).isRequired,
      inputMap: PropTypes.shape({
        timestamp: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        address: PropTypes.string.isRequired,
        signature: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default TransactionList;
