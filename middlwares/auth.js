const jwt = require("jsonwebtoken")

function auth (req,res,next) {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({

            msg:"unauthorized"
        })

    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded ; // if the token is correctly matched then decoded contain the info about the req.body
        return next();
    } catch (err) {
        return res.status(401).json({
            msg:"unauthorized"
        })
    }
}

module.exports = auth;