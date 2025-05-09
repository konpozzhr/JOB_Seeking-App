
const sendToken = (user, statusCode, res, message) =>{
    const token = user.genJwtToken();
    const options = {
        expires: new Date(
            // Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            Date.now() + process.env.COOKIE_EXPIRE * 60 * 1000
        ),
        httpOnly: true, 
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true, 
        user, 
        message, 
        token, 
    });
    console.log(`${res.statusCode} : ${res.statusMessage}\n${user}\n${message}\nToken: ${token} `);
};

module.exports = { sendToken };