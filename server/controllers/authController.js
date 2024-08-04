const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db');
const config = require('../config')
const userModel = require('../models/userModel');
const {errorRespone} = require('../helpers/utils')

const generateToken = (userId) => {
    const token = jwt.sign({ userId: userId }, config.env.JWT_SECRET, {
        expiresIn: '24h',
    });
    return token;
}

const signupUser = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData)
        let [ok, result] = await userModel.getUserByEmail(userData.email);
        if (ok && result !== null) {
            return res.status(401).json({ message: 'The email is already registered', error: true })
        }

        [ok, result] = await userModel.addUser(userData);

        if (!ok) return errorRespone(result, res);

        const token = generateToken(result.user_id);
        res.status(200).json({ ...result, token });
    }
    catch (err) {
        errorRespone(err, res);
    }
}

const signinUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const [ok, result] = await userModel.getUserByEmail(email);

        if (!ok) return errorRespone(result, res);

        if (result === null) {
            return res.status(401).json({ message: 'The email is not registered', error: true });
        }

        const isValid = await bcrypt.compare(password, result.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Incorrect password', error: true });
        }

        const token = generateToken(result.user_id);

        res.status(200).json({ ...result, token });
    }
    catch (err) {
        errorRespone(err, res);
    }
}

const verifyToken = async (req, res) => {
    try{
        const [ok, result] = await userModel.getUserById(req.userId);
        if (!ok) return errorRespone(result, res);
        const token = req.token
        res.status(200).json({...result, token});
    }
    catch (err) {
        errorRespone(err, res);
    }
}

module.exports = { signupUser, signinUser, verifyToken };