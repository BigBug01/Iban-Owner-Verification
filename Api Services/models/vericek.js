const mongoose = require('mongoose');
const schema = mongoose.Schema;


const uzaktanal = new schema({
    title : {
        type : String,
        require:true,
        
    }
},{timestamps:true});


const vericek  = mongoose.model('vericek',uzaktanal);
module.exports = vericek;


