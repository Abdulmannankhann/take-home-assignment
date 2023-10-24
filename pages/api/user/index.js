/* eslint-disable import/no-anonymous-default-export */
import User from "../../../config/model/user"
import dbConnect from "../../../config/db"

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const users = await User.find({}).sort({ _id: -1 });
				const user = users.filter((v)=>{
					return v.username
				})
                res.status(200).json({ success: true , data: user});
            } catch (error) {
                res.status(400).json({ success: false });
            }

		case "POST":
			try {
				const newUser = await User.create({
					username:req.body.username,
					bio:req.body.bio,
					profileUrl:req.body.profileUrl
				})
				res.status(200).json(newUser)
			} catch (error) {
				res.status(400).json({ success: false });
			}

		case "PATCH":
			try {
				const _id = req.body._id
				const user = await User.updateOne({_id:_id},{
					username:req.body.username,
					bio:req.body.bio,
					profileUrl:req.body.profileUrl
				})
				
				res.status(200).json(user)
			} catch (error) {
				res.status(400).json({ success: false });
			}
	
    }
}