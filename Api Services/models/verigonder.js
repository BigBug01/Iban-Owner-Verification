const mongoose = require('mongoose');
const schema = mongoose.Schema;


const verigonderSchema = new schema({
    title : {
        type : String,
        require:true,
        
    }
},{timestamps:true});

const verigonder = mongoose.model('verigonder',verigonderSchema);
module.exports = verigonder;



