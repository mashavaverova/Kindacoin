STEPS 

1.
  BLOCK CLASS 
-- Define the Block class +++++
-- Implement a constructor  (TDD for properties) ++++
-- Implement a static method to mine new blocks (TDD for mineBlock())  ++++

2.
BLOCKCHAIN CLASS 
-- Define the Blockchain class with properties (TDD for properties) ++++
-- Implement a constructor that initializes the chain with the genesis block ++++
-- Implement a method to add new blocks to the chain +++++   
-- Implement a method to validate the chain ++++ 
--  Implement a method to replace chain ++++

3.
BLOCK-CONTROLLER
    mineBlock




3. TRANSACTION POOL
    -- Create a Transaction Class
        Define the Transaction class with properties
        Implement a constructor
        Implement methods for creating and updating transactions
        Implement a method to validate transactions
    -- Define the TransactionPool class with properties
        Implement a method to add transactions to the pool
        Implement a method to clear the pool 
        Implement a method to validate transactions within the pool


MINING :

Implement a method to create new blocks from the transaction pool:
Gather transactions from the transaction pool.
Include a reward transaction for the miner.
Mine the block using the mining method from the Block class.
Add the mined block to the blockchain.
Implement a reward mechanism:
Define the reward amount.
Create a reward transaction that credits the miner's account.


NETWORKING 

-- set up PubNub
-- Set up nodes to communicate with each other using the chosen protocol.
Implement methods for:
    Broadcasting new blocks to other nodes.
    Broadcasting new transactions to other nodes.
    Synchronizing the blockchain (e.g., requesting and sending the latest blocks).
    Synchronizing the transaction pool


SECURITY 

4. Security
User Authentication:

Set up a MongoDB collection to store user information.
Use JWT (JSON Web Tokens) for user authentication.
Implement user registration:
Create endpoints for registering new users.
Hash and store passwords securely.
Generate and return a JWT upon successful registration.
Implement user login:
Create endpoints for logging in.
Verify user credentials.
Generate and return a JWT upon successful login.
Implement middleware to protect routes and ensure only authenticated users can access certain endpoint