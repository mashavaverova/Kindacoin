import { pubnubServer, blockchain } from '../server.mjs';
import  {asyncHandler} from '../middleware/asyncHandler.mjs';
import BlockModel from '../models/BlockModel.mjs';
import ResponseModel from '../utilities/ResponseModel.mjs';
import ErrorResponse from '../utilities/ErrorResponseModel.mjs';


// @desc    Mine a new block
// @route   POST /api/v1/block/mine
// @access  PRIVATE
export const mineBlock = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const block = blockchain.addBlock({ data });

  console.log('New block mined:'.cyan, block);
  
  try {
    const savedBlock = await BlockModel.create({
      timestamp: block.timestamp,
      blockIndex: block.blockIndex,
      lastHash: block.lastHash,
      hash: block.hash,
      data: block.data,
      nonce: block.nonce,
      difficulty: block.difficulty
    });

    console.log('Block saved to MongoDB:', savedBlock);

    pubnubServer.broadcast();

    res
      .status(201)
      .json(new ResponseModel({ success: true, statusCode: 201, data: block }));
  } catch (error) {
    console.error('Error saving block to MongoDB:', error);
    return next(new ErrorResponse('Error saving block', 500));
  }
});

// @desc    Get block by index
// @route   GET api/v1/block/:blockIndex
// @access  PRIVATE
export const getBlockByIndex = asyncHandler(async (req, res, next) => {
  const blockIndex = parseInt(req.params.blockIndex);
  const adjustedIndex = blockIndex - 1;

  if (adjustedIndex >= 0 && adjustedIndex < blockchain.chain.length) {
    const block = blockchain.chain[adjustedIndex];
    console.log('Block found:'.cyan, block);

    // Check and ensure the data field is an array of objects
    if (!Array.isArray(block.data)) {
      block.data = Array.isArray(block.data) ? block.data : [block.data];
    }

    res.status(200).json(new ResponseModel({ statusCode: 200, data: block }));
  } else {
    console.log('Block not found'.bgBlue);
    return next(new ErrorResponse('Block not found', 404));
  }
});
