import { useState, useEffect } from 'react';
import { getBlockchain, mineBlock, getBlockByIndex } from '../services/api';
import Logout from '../components/Logout';
import '../styles/general.css'; // Import your general styles
import logo from '../pics/logo.png';

const MinerDashboard = () => {
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState('');
  const [mining, setMining] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Fetch blockchain data when the component mounts
    const fetchBlockchain = async () => {
      try {
        console.log('Fetching blockchain data...'); // Log the start of fetching blockchain
        const response = await getBlockchain();
        console.log('Blockchain data fetched:', response); // Log the fetched blockchain data
        setBlocks(response.data); // Adjust based on your API response structure
      } catch (err) {
        console.error('Error fetching blockchain:', err); // Log the error for debugging
        setError('Error fetching blockchain');
      } finally {
        setLoading(false);
      }
    };

    fetchBlockchain();
  }, []); // Empty dependency array ensures this runs only on mount

  const handleMineBlock = async () => {
    setMining(true);
    setError(''); // Clear any previous errors
    try {
      console.log('Attempting to mine a block...'); // Log the start of mining
      const count = 1; // Adjust if you have a specific count
      const response = await mineBlock(count); // Pass the count parameter
      console.log('Block mined response:', response); // Log the response from mining
      // Refresh the blockchain list after mining a new block
      const newBlockchainResponse = await getBlockchain();
      setBlocks(newBlockchainResponse.data); // Adjust based on your API response structure
    } catch (err) {
      console.error('Error mining block:', err); // Log the error for debugging
      setError('Error mining block');
    } finally {
      setMining(false);
    }
  };

  const handleFetchBlock = async (index) => {
    try {
      console.log('Fetching block with index:', index); // Log the index value
      const response = await getBlockByIndex(index);
      console.log('Block data fetched:', response.data); // Log the fetched block data
    } catch (err) {
      console.error('Error fetching block by index:', err); // Log the error for debugging
      setError('Error fetching block by index');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="dashboard-title">Miner Dashboard</h1>
      </header>
      <Logout />
      <br />

      <button className="form-button" onClick={handleMineBlock} disabled={mining}>
        {mining ? 'Mining...' : 'Mine New Block'}
      </button>

      {error && <p className="error-message">{error}</p>}

      <div>
        <h2>Blockchain</h2>
        {loading ? (
          <p>Loading blockchain...</p>
        ) : (
          blocks.length > 0 ? (
            <ul>
              {blocks.map((block) => (
                <li key={block.index} className="block-item">
                  <div><strong>Index:</strong> {block.index}</div>
                  <div><strong>Timestamp:</strong> {new Date(block.timestamp).toLocaleString()}</div>
                  <div><strong>Previous Hash:</strong> {block.previousHash}</div>
                  <div><strong>Hash:</strong> {block.hash}</div>
                  <div><strong>Data:</strong> {JSON.stringify(block.data)}</div>
                  <div><strong>Nonce:</strong> {block.nonce}</div>
                  <div><strong>Difficulty:</strong> {block.difficulty}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No blocks available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default MinerDashboard;
