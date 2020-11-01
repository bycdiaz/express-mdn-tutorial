const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;
const AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  let authorDeath = DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  let authorBirth = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);

  if (authorBirth === 'Invalid DateTime') authorBirth = 'Unknown';
  if (authorDeath === 'Invalid DateTime') authorDeath = '';

  return `${authorBirth} - ${authorDeath}`;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
