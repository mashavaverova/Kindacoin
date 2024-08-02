import PropTypes from 'prop-types';
import '../styles/general.css'; // Import your general styles

const TransactionList = ({ transactions }) => {
  if (!Array.isArray(transactions)) {
    return <p className="no-data-message">No transactions available.</p>;
  }

  return (
    <div className="transaction-list-container">
      <h4 className="list-title">Transaction List</h4>
      {transactions.length > 0 ? (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <div><strong>ID:</strong> {transaction.id}</div>
              <div><strong>Output Map:</strong></div>
              <ul className="output-map">
                {Object.entries(transaction.outputMap).map(([address, amount]) => (
                  <li key={address} className="map-entry">{address}: {amount}</li>
                ))}
              </ul>
              <div><strong>Input Map:</strong></div>
              <div>Timestamp: {new Date(transaction.inputMap.timestamp).toLocaleString()}</div>
              <div>Amount: {transaction.inputMap.amount}</div>
              <div>Address: {transaction.inputMap.address}</div>
              <div>Signature: {JSON.stringify(transaction.inputMap.signature)}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data-message">No transactions found.</p>
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
        signature: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default TransactionList;
