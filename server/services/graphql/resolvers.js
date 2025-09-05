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
            const habits=await Habit.findById(userId)
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
        createHabit:async(parent,args)=>{
            const {user} =context
            const {title,category,frequency,selectedDays} =args
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

    }

}
export default resolvers