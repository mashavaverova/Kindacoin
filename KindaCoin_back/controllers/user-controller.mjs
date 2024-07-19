import User from '../models/UserModel.mjs';
import { asyncHandler } from '../middleware/asyncHandler.mjs';
import ErrorResponse from '../utilities/ErrorResponseModel.mjs';

// @desc  Add a new user
// @route POST /api/v1/users/
// @access  PRIVATE (admin only)
export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    data: user,
  });
});

// @desc  Get a user
// @route GET /api/v1/users/:id
// @access  PRIVATE
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User with id ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: user,
  });
});

// @desc  Get all users
// @route GET /api/v1/users/
// @access  PRIVATE
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: users,
  });
});

// @desc  Delete a user
// @route DELETE /api/v1/users/:id
// @access  PRIVATE
export const deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// @desc  Update a user
// @route PUT /api/v1/users/:id
// @access  PRIVATE
export const updateUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  res.status(204).send();
});
