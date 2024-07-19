import { describe, it, expect, beforeEach, vi } from 'vitest';
import Block from '../models/Block.mjs';
import Blockchain from '../models/Blockchain.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';

describe('Blockchain', () => {
  let blockchain, newBlockchain, originalChain;

  beforeEach(() => {
    blockchain = new Blockchain();
    newBlockchain = new Blockchain();
    originalChain = blockchain.chain;
  });

  describe('Properties of Blockchain', () => {
    it('should have a property named "chain"', () => {
      expect(blockchain).toHaveProperty('chain');
    });

    it('should have a property "chain" of type Array', () => {
      expect(blockchain.chain).toBeInstanceOf(Array);
    });

    it('should have the genesis block as the first block in the chain', () => {
      expect(blockchain.chain[0]).toEqual(Block.genesis);
    });
  });

  describe('AddBlock Method', () => {
    it('should add a new block to the chain', () => {
      const data = 'TEST DATA';
      blockchain.addBlock({ data: data });

      expect(blockchain.chain.at(-1).data).toEqual(data);
    });
  });

  describe('ValidateChain Method', () => {
    it('should validate a valid chain', () => {
      blockchain.addBlock({ data: 'Block 1 data' });
      blockchain.addBlock({ data: 'Block 2 data' });

      expect(Blockchain.validateChain(blockchain.chain)).toBe(true);
    });

    it('should invalidate a chain with a corrupt genesis block', () => {
      blockchain.chain[0].data = 'CORRUPTED GENESIS DATA';

      expect(Blockchain.validateChain(blockchain.chain)).toBe(false);
    });

    it('should invalidate a corrupt chain', () => {
      blockchain.addBlock({ data: 'Block 1 data' });
      blockchain.addBlock({ data: 'Block 2 data' });

      blockchain.chain[1].data = 'CORRUPTED DATA';

      expect(Blockchain.validateChain(blockchain.chain)).toBe(false);
    });
  });

  describe('ReplaceChain Method', () => {
    describe('when the new chain is shorter', () => {
      it('should not replace the chain', () => {
        newBlockchain.chain[0] = { info: 'chain' };
        blockchain.replaceChain(newBlockchain.chain);
        expect(blockchain.chain).toEqual(originalChain);
      });

      describe('when the new chain is longer', () => {
        beforeEach(() => {
          newBlockchain.addBlock({ data: 'DATA 1' });
          newBlockchain.addBlock({ data: 'DATA 2' });
          newBlockchain.addBlock({ data: 'DATA 3' });
        });

        describe('and the chain is invalid', () => {
          it('should not replace the chain', () => {
            newBlockchain.chain[1].hash = 'dummy-hash';
            blockchain.replaceChain(newBlockchain.chain);

            expect(blockchain.chain).toEqual(originalChain);
          });
        });

        describe('and the chain is valid', () => {
          it('should replace the chain', () => {
            blockchain.replaceChain(newBlockchain.chain);
            expect(blockchain.chain).toBe(newBlockchain.chain);
          });
        });
      });
    });
  });
});
