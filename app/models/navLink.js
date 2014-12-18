// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var NavLinkSchema = new Schema({
  page: String,
  active: Boolean
});

NavLinkSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('NavLink', NavLinkSchema);

