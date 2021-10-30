const logger = require('../logger');
const jwt = require('jsonwebtoken');
const tokenConfig = require('../../config').jwt;
const crypto = require('../crypto');
const userHanl = require('../user/handle');

const mandatory = (parameter = 'Parameter') => {
  throw new Error(`${parameter} is required`);
};

const getToken = async (username = mandatory('username'), password = mandatory('password')) => {
  try {
    const user = (await userHanl.getUserByUsername(username));
    if (!user || !crypto.matches(password, user.password)) {
      throw new Error(`Invalid username or password`);
    }
    delete user.password;

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    const token = jwt.sign(payload, tokenConfig.secrectKey, {algorithm: tokenConfig.algorithm, expiresIn: tokenConfig.expiresInMinutes * 60});
    return {user: user, token: `JWT-${token}`};
  } catch (error) {
    throw error;
  }
};

const verify = async (headers = mandatory('headers')) => {
  const payload = await isValidToken(headers);
  const username = payload.username;
  const checkUser = (await userHanl.getUsers({username}))[0];
  if (!checkUser) {
    throw new Error('Token is invalid');
  }
  return checkUser;
};

const isValidToken = (headers = mandatory('headers')) => {
  const readAuthorization = (authorization) => {
    return new Promise((resolve, reject) => {
      if (!authorization || !authorization.trim()) {
        return reject(new Error(`Missing Authorization`));
      }
      const parts = authorization.split(`-`);
      if (String(parts[0]).toUpperCase() === `JWT` && authorization.substring(4)) {
        return resolve(authorization.substring(4).trim());
      }
      return reject(new Error(`Wrong Authorization`));
    });
  };

  const decodeToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, tokenConfig.secrectKey, {algorithm: tokenConfig.algorithm}, (err, decode) => {
        if (err) return reject(err);
        return resolve(decode);
      });
    });
  };

  return readAuthorization(headers.authorization)
    .then((token) => decodeToken(token))
    .then((payload) => Promise.resolve(payload))
    .catch((err) => Promise.reject(err));
};

module.exports = {getToken, verify};
