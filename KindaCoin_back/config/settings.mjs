export const MINE_RATE = 1000;
export const INITIAL_BALANCE = 1000;
export const REWARD_ADDRESS = { address: 'reward-address' };
export const MINING_REWARD = 50;
const INITIAL_DIFFICULTY = 3;

// genesis block for testing purpose
export const GENESIS_DATA = {
  timestamp: 1,
  blockIndex: 1,
  lastHash: '0',
  hash: '0',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: [], 
  transactions: []
};
