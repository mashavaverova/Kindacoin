
import PropTypes from 'prop-types';

const BlockList = ({ blocks }) => {
  return (
    <div>
      <h2>Blocks</h2>
      <ul>
        {blocks.map((block, index) => (
          <li key={index}>
            <strong>Index:</strong> {block.index} | 
            <strong> Timestamp:</strong> {block.timestamp} | 
            <strong> Hash:</strong> {block.hash} | 
            <strong> Previous Hash:</strong> {block.previousHash}
          </li>
        ))}
      </ul>
    </div>
  );
};

BlockList.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      previousHash: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BlockList;
