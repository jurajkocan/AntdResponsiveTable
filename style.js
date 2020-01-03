require("./lib/AntResponsiveTable");
const typestyle = require("typestyle");
typestyle.getStyles();
const styles = typestyle.getStyles();

const fs = require("fs");
fs.writeFile("lib/style.css", styles, function(err) {
  if (err) throw err;
});
