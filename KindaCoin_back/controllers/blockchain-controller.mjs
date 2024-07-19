import { asyncHandler } from '../middleware/asyncHandler.mjs';
import { blockchain } from '../server.mjs';


// @desc    List all blocks
// @route   GET /api/v1/blockchain
// @access  PRIVATE
export const listBlock = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: {
      blocks: blockchain.chain,
      //  pendingTransactions: blockchain.pendingTransactions //?
    },
  });
});
