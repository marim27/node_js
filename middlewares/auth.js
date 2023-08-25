const jwt = require("jsonwebtoken");
var {promisify} = require("util");
async function auth(req, res, next) {
      if (!req.headers.authorization) {
           return res.status(401).json({ message:'please log in'});
        }try {
          var decoded=  await promisify(jwt.verify)(req.headers.authorization,process.env.SECRET)
    console.log(decoded);
        }catch (err) {
            res.status(401).json({ message:'not authorized'});
        }
        next();
    }
module.exports = auth;