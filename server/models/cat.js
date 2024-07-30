const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const GatoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
});

GatoSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

GatoSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        console.log('Comparando senhas:', candidatePassword, this.password, isMatch);
        return isMatch;
    } catch (err) {
        console.error('Erro ao comparar senhas:', err);
        throw err;
    }
};

const GatoModel = mongoose.model("Gato", GatoSchema); 
module.exports = GatoModel;
