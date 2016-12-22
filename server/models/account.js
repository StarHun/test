import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Account - new Schema({
  username: String,
  password: String,
  created: { type: Date, default: Date.now}
});

//generate hash
Account.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
};

Account.methods.vaildateHash = function(password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('account', Account);
