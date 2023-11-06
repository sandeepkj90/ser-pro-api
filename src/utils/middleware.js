const Utility = require('../utils/utility');
const MiddlewareService = {
authenticate:(req,res,next)=>{
    if(!req.headers.authorization)
    return res.send({status:406,message:'Token is not provided',data:''});
    let data = req.headers.authorization;
    // if()
    req.user = Utility.verifyToken(data);
    next();

}
}
module.exports = MiddlewareService;