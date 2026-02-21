import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { LoginUser, RegisterUser, UserInfo } from "./auth.types";
import { loginSchema, registerSchema } from "./auth.validation";
import { prisma } from "../../config/db";
import jwt from "jsonwebtoken";

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
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      res.status(400).json({ message: "User Already Exist" });
      return;
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 15);
    const newUser = await prisma.user.create({
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
