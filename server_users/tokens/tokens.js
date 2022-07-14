const { tokens } = require('../db/models');

/* return true if Token found in the Tokens Table */
async function findToken(token) {
  try {
    const currentToken = await tokens.findOne({ where: { token } });
    if (currentToken) {
      return true;
    }
    return false;
  } catch (err) {
    console.log('ERROR--->', err);
    return false;
  }
}

/* return true if Token added or found in the Tokens Table */
async function addToken(token) {
  try {
    /* check if token exists */
    const currentToken = await tokens.findOne({ where: { token } });
    if (!currentToken) {
      await tokens.create({ token });
    }
    return true;
  } catch (err) {
    console.log('ERROR--->', err);
    return false;
  }
}

/* return true if Token deleted from the Tokens Table */
async function deleteToken(token) {
  try {
    /* check if token exists */
    const currentToken = await tokens.findOne({ where: { token } });
    if (currentToken) {
      await tokens.destroy({ where: { token } });
    }
    return true;
  } catch (err) {
    console.log('ERROR--->', err);
    return false;
  }
}

module.exports = { findToken, addToken, deleteToken };
