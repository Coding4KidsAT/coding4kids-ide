modalErrors = new Meteor.Collection(null);


throwModalError = function(message) {
  modalErrors.insert({message: message, seen: false})
}
