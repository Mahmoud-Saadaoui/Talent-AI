import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { LoginUser, RegisterUser, loginSchema, registerSchema } from "./auth.types";

export const register = async (req: Request, res: Response) => {
    console.log("first")
};

export const login = async (req: Request, res: Response) => {
    console.log("second")
};
