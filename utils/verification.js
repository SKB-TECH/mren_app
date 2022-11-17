// cette fonction va permettre la verification de la Validite de token de l'utilisateur

const jwt = require("jsonwebtoken");
const userModel = require("../models/User");


//cette fonction va verifie si l'utilisateur possede un token valide\
exports.checkUser = (req, res, next) => {
    const tokens = req.cookie.jwt;
    if (tokens) {
        jwt.verify(tokens, process.env.SECRETE_KEY, async (error, decode) => {
            if (error) {
                res.locals.user = null;
                res.cookies("jwt", "", { maxAge: 1 });
                next();
            } else {
                let user = await userModel.findById(decode.id);
                res.locals.user = user
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

// verifie comme c'est la premiere esk il existe dans la bdd du system
// esk il ne s'est pas encore connecte pour lui facilite la tache
exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRTE_KEY, async (error, decode) => {
            if (error) {
                console.log("error");
            } else {
                console.log(decode.id);
                next();
            }
        });
    } else {
        console.log("No token fund");
    }
};
