
import user from "../model/user.js"

const ensureStudent = async (req, res, next) => {
    const curUser = await user.findOne({ _id: req.userId });
    if(curUser?.role === "student"){
        next()
    }else{
        res.status(401).json({ message: "you're an unauthorized user" });
    }
}

export default ensureStudent;