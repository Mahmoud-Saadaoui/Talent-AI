import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { LoginUser, RegisterUser, UserInfo } from "./auth.types";
import { loginSchema, registerSchema } from "./auth.validation";
import { prisma } from "../../config/db";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { getVerificationEmailTemplate } from "./templates";
import { sendEmail } from "./nodemailer";

const generateToken = (res: Response, userInfo: UserInfo): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new Error("Missing ACCESS_TOKEN_SECRET or EXPIRES_IN in environment");
  }
  const accessToken = jwt.sign({ userInfo }, secret, { expiresIn: Number(expiresIn) });

  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return accessToken
};

/**
 *  @method  POST
 *  @route   /api/v1/auth/register
 *  @desc    Create New User
 *  @access  public
*/
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, gender } = req.body as RegisterUser;
    // Validation with zod
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0].message });
    }

    // Check if user exist
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) {
      res.status(400).json({ message: "User Already Exist" });
      return;
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 15);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role,
        gender,
      },
      select: {
        name: true,
        id: true,
        email: true,
      },
    });
    
    // Generate an email verification token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const vtoken = await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: rawToken
      }
    })

    // Create the verification link
    const clientUrl = process.env.CLIENT_URL
    const link = `${clientUrl}/auth/${user.id}/verify/${vtoken.token}`
    // Prepare the email content and send it
    const htmlTemplate = getVerificationEmailTemplate(link);
    await sendEmail(user.email, "Verify Your Email Address", htmlTemplate);

    // Respond with success message
    res.status(201).json({
      message: "Registration successful! Please verify your email address.",
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({
      message: "Internal Server Error",
      error: errorMessage,
    });
  }
};

/**
 *  @method  POST
 *  @route   /api/v1/auth/login
 *  @desc    Login User
 *  @access  public
*/
export const login = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body as LoginUser;
    // Validation with zod
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0].message });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      // Check if email is verified
      if (!user.isAccountVerified) {
        res.status(400).json({ message: "Please verify your email address before logging in." });
        return;
      }
      // Generate authentication token
      const token = generateToken(res, {
        id: user.id,
        email: user.email,
      });
      res.status(200).json({
          id: user.id,
          name: user.name,
          role: user.role,
          token,
      });
      return;
    } else {
      res.status(400).json({
        message: "Invalid Credentials!",
      });
      return;
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({
      message: "Internal Server Error",
      error: errorMessage,
    });
  }
};

/**
 *  @method  POST
 *  @route   /api/v1/auth/:userId/verify/:token
 *  @desc    Create New User
 *  @access  public
*/
export const verifyAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, token } = req.params
    // Validate params
    if (!userId || !token || Array.isArray(token)) {
      res.status(400).json({ message: "Invalid verification link." });
      return;
    }

    const numericUserId = Number(userId);
    if (isNaN(numericUserId)) {
      res.status(400).json({ message: "Invalid user ID." });
      return;
    }
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: numericUserId }
    });
    if (!user) {
      res.status(400).json({ message: "Invalid verification link." })
      return 
    }
    if (user?.isAccountVerified) {
      res.status(200).json({
        message: "Your account is already verified.",
        user,
      });
      return 
    }
    // Check if token exists for this user
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { 
        userId: user?.id, 
        token 
      },
    });
    if (!verificationToken) {
      res.status(400).json({ message: "Invalid or expired verification link." })
      return 
    }
    // Mark account as verified
    const updatedUser = await prisma.user.update({
      where: { id: numericUserId },
      data: { isAccountVerified: true },
      select: { 
        id: true, 
        name: true, 
        email: true,
        role: true,
      }
    });
    // Delete used token
    await prisma.verificationToken.delete({
      where: { id: verificationToken?.id },
    });
    // Respond with success
    res
      .status(200)
      .json({
        message: "Your account has been successfully verified.",
        user: updatedUser,
      });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({
      message: "Internal Server Error",
      error: errorMessage,
    });
  }
}
