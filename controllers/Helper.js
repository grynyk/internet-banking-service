import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id,admin,firstname,lastname,address) {
    const token = jwt.sign({
      userId: id,
      admin:admin,
      firstname:firstname,
      lastname:lastname,
      address:address
    },
      process.env.SECRET, { expiresIn: '1d' }
    );
    return token;
  }
}

export default Helper;