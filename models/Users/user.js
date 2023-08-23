const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true,'Name is required field'],
    },
    email: {
      type: String,
      required: [true,'Email is required field'],
      unique:true,
      validate: {
        validator: function (value) {
          // Using a regular expression to validate the email format
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    password: {
      type: String,
      select: false,
      required: [true,'Password is required field'],
    },
    user_type: {
      type: String,
      enum: ['admin', 'teacher', 'staff'],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash the password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
      return next(); // If password is not modified, call next middleware
  }

  try {
      const saltRounds = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
      next();
  } catch (error) {
      next(error);
  }
});

//model
const User = mongoose.model("user", userSchema);

module.exports = User;
