import { it, describe, expect, beforeEach } from 'vitest';
import { GENESIS_DATA, MINE_RATE } from '../config/settings.mjs';
import Block from '../models/Block.mjs';
import hexToBinary from 'hex-to-binary';
import { createHash } from '../utilities/crypto-lib.mjs';

describe('Block', () => {
  const timestamp = Date.now();
  const blockIndex = 0; 
  const lastHash = '0';
  const hash = '0';
  const nonce = 1;
  const difficulty = 1;
  const data = ['data'];
  const transactions = ['transactions'];

  const block = new Block({
    timestamp,
    blockIndex, 
    lastHash,
    hash,
    data,
    nonce,
    difficulty,
    transactions,
  });

  describe('Properties', () => {
    it('should have the properties timestamp, blockIndex, lastHash, hash, data, nonce, difficulty, and transactions', () => {
      expect(block).toHaveProperty('timestamp');
      expect(block).toHaveProperty('blockIndex');
      expect(block).toHaveProperty('lastHash');
      expect(block).toHaveProperty('hash');
      expect(block).toHaveProperty('data');
      expect(block).toHaveProperty('nonce');
      expect(block).toHaveProperty('difficulty');
      expect(block).toHaveProperty('transactions');
    });

    it('should have values for each property', () => {
      expect(block.timestamp).toEqual(timestamp);
      expect(block.blockIndex).toEqual(blockIndex); 
      expect(block.lastHash).toEqual(lastHash);
      expect(block.hash).toEqual(hash);
      expect(block.data).toEqual(data);
      expect(block.nonce).toEqual(nonce);
      expect(block.difficulty).toEqual(difficulty);
      expect(block.transactions).toEqual(transactions);
    });
  });

  describe('Genesis Block', () => {
    const genesis = Block.genesis;

    it('should return an instance of the Block class', () => {
      expect(genesis).toBeInstanceOf(Block);
    });

    it('should return the genesis data', () => {
      expect(genesis).toEqual(GENESIS_DATA);
    });
  });

  describe('Mine Block', () => {
    let lastBlock, minedBlock, data, transactions;

    beforeEach(() => {
      lastBlock = Block.genesis;
      data = 'mined-data';
      transactions = ['transactions'];
      minedBlock = Block.mineBlock({ lastBlock, data, transactions });
    });

    it('should return an instance of the Block class', () => {
      expect(minedBlock).toBeInstanceOf(Block);
    });

    it('should add a timestamp', () => {
      expect(minedBlock.timestamp).not.toBeUndefined();
    });

    it('should set the lastHash to match the lastBlock hash', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it('should set the data', () => {
      expect(minedBlock.data).toEqual(data);
    });

    it('should set the transactions', () => {
      expect(minedBlock.transactions).toEqual(transactions);
    });

    it('should produce a hash based on correct input', () => {
      expect(minedBlock.hash).toEqual(
        createHash(
          minedBlock.timestamp,
          minedBlock.lastHash,
          data,
          transactions,
          minedBlock.nonce,
          minedBlock.difficulty
        )
      );
    });

    it('should produce a hash that matches the difficulty criteria', () => {
      expect(
        hexToBinary(minedBlock.hash).substring(0, minedBlock.difficulty)
      ).toEqual('0'.repeat(minedBlock.difficulty));
    });
  });
});
