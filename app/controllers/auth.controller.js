const bcrypt = require('bcrypt');
const { now } = require('mongoose');
const db = require('../models');
const userService = require('../services/auth.services');
const jwt = require('jsonwebtoken');
const User = db.users

require("dotenv").config();

exports.findAll = (req, res) => {
    User.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Something went wrong'
        })
    });
}


exports.login = async (req, res) => {
    body = req.body;

    var data = await userService.findUser(body.email, body.password);
    if (data !== null) {
        const match = await bcrypt.compare(body.password, data['password']);
        if (!match) {
            return res.status(401).send({
                message: 'Password does not match',
            })
        } else {
            const userId = data['id'];
            const name = data['name'];
            const email = data['email'];

            const accessToken = jwt.sign({userId, name,email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '20s'
            });
            const refreshToken = jwt.sign({userId, name,email}, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: '1d'
            });

            return res.status(200).send({
                message: 'Login successful',
                data:data,
                accessToken: accessToken,
            })
        }
    } else {
        res.status(401).json({ message: "Email Not Found" });
    }
}


exports.register = async (req, res) => {
    body = req.body;

    User.create({
        name: body.name,
        email: body.email,
        role: 1,
        email_verified_at: Date('Y-m-d'),
        password: body.password,
    }).then((result) => {
        res.send({message:'Successfully Registered', body: result});
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Something went wrong'
        })
    });
}

exports.logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}