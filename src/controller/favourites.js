import favourites from  "../model/favourites.js"
import user from "../model/user.js"

export const addTeacherToList = async (req, res) => {
    const list = req.body.list;
    const userId = req.userId;
    try{
        const curUser = await user.findOne({ _id: userId }).populate("favourites");
        if(curUser?.favourites){
            await favourites.updateOne({ _id:curUser?.favourites?._id }, { $addToSet: { teacherList: {$each: list }} });
        }else{
            const fav = await favourites.create({ teacherList:list });
            await user.updateOne({ _id: userId}, { $set: {favourites: fav}});
        }
        const curModUser = await user.findOne({ _id: userId }).populate("favourites");
        res.status(200).json({ curModUser });
    }
    catch(err){
        res.status(405).json({ message: "Couldn't add teacher to favourites" });
    }
}

export const removeTeacherFromList = async (req, res) => {
    const teacherId = req.body.teacherId;
    const userId = req.userId;
    try{
        const curUser = await user.findOne({ _id: userId }).populate("favourites");
        if(curUser?.favourites?.teacherList.includes(teacherId)){
            await favourites.updateOne({ _id:curUser?.favourites?._id }, { $pull: { teacherList: teacherId } });
            const curModUser = await user.findOne({ _id: userId }).populate("favourites");
            res.status(200).json({ curModUser });
        }else{
            res.status(404).json({ message: "Teacher not found" });
        }
    }catch(err){
        res.status(405).json({ message: "Couldn't remove teacher from favourites" });
    }
}

export const getAllTeacherList = async (req, res) => {
    try{
        const users = await user.find({ role: "teacher" });
        res.status(200).json({ users });
    }
    catch(err){
        res.status(400).json({ message: "Couldn't load list of teachers" });
    }
}

export const mostFavTeacher = async (req, res) => {
    try{
        const favTeachers = await favourites.aggregate([
            {$unwind: "$teacherList"},
            {$group: {
                _id: "$teacherList",
                count: {
                   $count: {}
                }
             }},
            {$sort : { count : -1 }},
            {$limit: 5}
        ])
        await user.populate(favTeachers, {path: "_id", select:  {_id: 1, name: 1, email:1, role:1}});
        res.status(200).json({ favTeachers });
    }
    catch(err){
        res.status(400).json({ message: "Couldn't load the most favourite teachers" });
    }
}

export const searchTeacher = async (req, res) => {
    try {
        const searchKey = req.query.search ?
        {
            $or : [
                { name: { $regex:  req.query.search, $options: "i" } },
                { email: { $regex:  req.query.search, $options: "i" } }
            ]
        } : {};
        const users = await user.find(searchKey).find({ role: { $eq: "teacher" }});
        res.status(200).json({ users });
    } catch (error) {
        res.status(404).json({ message: "Teacher not found" });
    }
}
