import { it, describe, expect, beforeEach, vi } from 'vitest';

import Transaction from '../models/Transaction.mjs';
import TransactionPool from '../models/TransactionPool.mjs';

describe('TransactionPool', () => {
    let transactionPool, transaction, sender;
    
    beforeEach(() => {
        sender = {
            publicKey: 'sender-public-key',
            balance: 100,
            sign: vi.fn(() => 'signature'), 
        };

        transaction = new Transaction({
            sender,
            recipient: 'Bushing',
            amount: 10,
        });
        transactionPool = new TransactionPool();
    });

    describe('properties', () => {
        it('should have a property named transactionMap', () => {
          expect(transactionPool).toHaveProperty('transactionMap');
        });
      });

      describe('addTransaction()', () => {
        it('should add a transaction to the transaction pool', () => {
          transactionPool.addTransaction(transaction);
    
          expect(transactionPool.transactionMap[transaction.id]).toBe(transaction);
        });
      });

      describe('transactionExist()', () => {
        it('should return a transaction based on its address', () => {
          transactionPool.addTransaction(transaction);
    
          expect(
            transactionPool.transactionExist({ address: sender.publicKey })
          ).toBe(transaction);
        });
      });

     
        
})
