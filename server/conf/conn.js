import mongoose from "mongoose";
async function mongoDbConnect(url){
    mongoose.connect(url)
}
export default mongoDbConnect