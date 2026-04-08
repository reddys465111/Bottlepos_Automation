module.exports = {

 validateGetItems: function (req, res, context, ee, next) {

  let names = context.vars.itemname;

  if (!names) {
    throw new Error("No item names found in GET response");
  }

  if (!Array.isArray(names)) {
    names = [names];
  }

// Validate  that with Name Assertion
  const firstName = names[0];

  console.log(" First Item Name:", firstName);

  if (!firstName || firstName.trim() === "") {
    throw new Error("First item name is invalid or empty");
  }

  return next();
}

};