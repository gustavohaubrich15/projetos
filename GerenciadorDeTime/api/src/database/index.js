const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useUnifiedTopology: true,
useNewUrlParser: true,});
mongoose.Promise =global.Promise;
module.exports=mongoose;