import mongoose from "mongoose"
import Habit from "../../models/habit.js"
import User from "../../models/user.js"

const resolvers ={
    Query:{
        getUser:async()=>{
            const users=await User.find({})
            if(users){
                return users
            }
        },
        getHabits:async(parent,{userId})=>{
            const habits=await Habit.find({userId:new mongoose.Types.ObjectId(userId)})
            if(habits){

                return habits
            }
        },

    },
    Mutation:{
        createUser:async(parent,args)=>{
            const {name,email,password} =args.input
            console.log(name,email,password)
            const createUser = await User.create({
                name,email,password
            })
            return createUser
        },
        loginUser:async(parent,args,context)=>{
            const {email,password} =args.input
            const {res} =context
            const token = await User.matchPassordAndValidateToken(email,password)
             res.cookie('token',token)
              return true
        },
        createHabit:async(parent,args,context)=>{
            const {user} =context
            const {title,category,frequency,selectedDays} =args.input
            const createHabit = await Habit.create({
                userId:user.id,
                title,
                category,
                frequency,
                selectedDays,
                completedDates:[]
            })
            return createHabit
        },
        updateCompleteDates:async(parent,args,context)=>{
           const {user} =context
            const {completedDates,id} =args.input
            console.log(completedDates,id)
            const habit = await Habit.findById(id);
            const updatedCompletedDates = [...habit.completedDates, completedDates];
        //    const updateHabit =await Habit.findByIdAndUpdate(id,{
        //     completedDates:updatedCompletedDates
        //    },{new:true})
        //    return updateHabit

        }

    }

}
export default resolvers