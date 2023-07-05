const jwt = require("jsonwebtoken");


//verify Token
function verifyToken(req,res,next){
    const token = req.headers.token;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({message: "Invalid token"});
        }

    }else{
        res.status(401).json({message: "Not token provided"}); //401 means Not Authorized
    }
};


// Verify token & authorized users 
function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message: "Not allowed, Only You Can Update Your Profile"}); // 403 means forbidden
        }
    })
};

// Verify token & admin
function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res, ()=> {
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message: "Not allowed, Only Admin"}); // 403 means forbidden
        }
    }
    );
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}