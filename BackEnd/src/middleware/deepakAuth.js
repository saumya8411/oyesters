const jwt = require('jsonwebtoken')

//Connecting to Database
const connection = require('../db/sql')

const auth = (req,res,next) => {
    try{
        let token = req.get("authorization");
        
        //If there is no token
        if(!token){
            return res.status(500).json({
                success:0,
                error:"Access Denied",
            });
        }
        //Remove Bearer
        token = token.slice(7);
        jwt.verify(token,process.env.JWT_KEY,async (err,decoded) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    error:"Invalid token",
                });
            }

            // console.log(decoded.temporaryResult[0])
            
            req.user = decoded.temporaryResult[0];
            next();

            // let sql = `SELECT * FROM CUSTOMER_TABLE WHERE CUSTOMER_EMAIL='${req.body.customer_email}'`;
           
            // connection.query(sql,(err,result) => {
            //     if(err){
            //         throw err;
            //     }

            //     req.user = result[0]
            //     req.token = token
            //     next();
            // })
        })


    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success:0,
            error:"Authentication Error",
            errorReturned:err
        });
    }
}



module.exports = auth