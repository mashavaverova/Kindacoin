import User from '../models/UserModel.mjs';
import ErrorResponse from '../utilities/ErrorResponseModel.mjs';
import { asyncHandler } from '../middleware/asyncHandler.mjs';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  PUBLIC
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });

  createAndSendToken(user, 201, res);
});

// @desc    Log in an existing user
// @route   POST /api/v1/auth/login
// @access  PUBLIC
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  console.log('Received email:', email);
  console.log('Received password:', password);

  if (!email || !password) {
    return next(new ErrorResponse('Email or password not provided', 400));
  }

  // Validate login via email
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Login failed', 401));
  }

  // Validate login via password
  const isCorrect = await user.validatePassword(password);

  if (!isCorrect) {
    return next(new ErrorResponse('Login failed', 401));
  }

  createAndSendToken(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  PRIVATE
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: user,
  });
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updateuser
// @access  PRIVATE
export const updateUserDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, statusCode: 200, data: user });
});

// @desc    Update user password
// @route   PUT /api/v1/auth/updatepassword
// @access  PRIVATE
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.validatePassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Incorrect password', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  createAndSendToken(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  PUBLIC
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const email = req.body.email;

  if (!email) {
    return next(new ErrorResponse('Email for password reset is missing', 400));
  }

  let user = await User.findOne({ email });

  if (!user)
    return next(
      new ErrorResponse(`No user with email ${email} found`, 400)
    );

  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  res.status(200).json({
    success: true,
    statusCode: 201,
    data: { token: resetToken, url: resetUrl },
  });
});

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:token
// @access  PUBLIC
export const resetPassword = asyncHandler(async (req, res, next) => {
  const password = req.body.password;
  const token = req.params.token;

  if (!password) return next(new ErrorResponse('Password is missing', 400));

  let user = await User.findOne({ resetPasswordToken: token });

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;

  await user.save();

  createAndSendToken(user, 200, res);
});

const createAndSendToken = (user, statusCode, res) => {
  const token = user.generateToken();

  res.status(statusCode).json({ success: true, statusCode, token });
};
