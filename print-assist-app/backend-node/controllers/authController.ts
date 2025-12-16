import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// @ts-ignore
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(`[Register] Attempting to register: ${email}`);

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('[Register] User already exists');
      return res.status(400).json({ msg: 'User already exists' });
    }

    // REMOVED: Manual Hashing
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    console.log('[Register] Creating user in DB (Delegating hashing to Model)...');

    // PASS PLAIN PASSWORD - The User Model will hash it!
    const newUser = await User.create({
      email,
      password: password,
      isSubscribed: false
    });

    console.log(`[Register] User created. ID: ${newUser.id}`);

    const payload = {
      user: {
        id: newUser.id
      }
    };

    console.log('[Register] Signing JWT...');
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          console.error('[Register] JWT Signing Error:', err);
          return res.status(500).json({ msg: 'Error signing token' });
        }
        console.log('[Register] Success! Sending token.');
        res.status(201).json({ token, user: { id: newUser.id, email: newUser.email } });
      }
    );

  } catch (error: any) {
    console.error('[Register] Critical Error:', error.message);
    res.status(500).send('Server Error');
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(`[Login] Attempting login: ${email}`);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('[Login] User not found');
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('[Login] Password mismatch');
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          console.error('[Login] JWT Error:', err);
          return res.status(500).send('Token Error');
        }
        res.json({ token, user: { id: user.id, email: user.email } });
      }
    );

  } catch (error: any) {
    console.error('[Login] Critical Error:', error.message);
    res.status(500).send('Server Error');
  }
};