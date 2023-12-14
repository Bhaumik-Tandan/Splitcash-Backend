import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
    validate: {
      validator: (value) => {
        return validator.isEmail(value); // Check if the value is a valid email address
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});


const User = mongoose.model('User', UserSchema);

export default User;
