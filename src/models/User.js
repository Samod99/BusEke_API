const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        role: { 
            type: String, 
            enum: ['admin', 'operator', 'commuter'], 
            default: 'commuter' 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        }
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

const User = mongoose.model('User', userSchema);

module.exports = User;