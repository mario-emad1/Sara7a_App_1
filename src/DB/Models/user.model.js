import mongoose, { Schema } from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../Utils/enums/user.enum.js";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is required"],
            minLength: [3, "First Name must be at least 3 characters"],
            maxLength: [25, "First Name must be at most 25 characters"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required"],
            minLength: [3, "Last Name must be at least 3 characters"],
            maxLength: [25, "Last Name must be at most 25 characters"],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        DOB: Date,
        age: Number,
        phone: String,
        gender: {
            type: Number,
            enum: Object.values(GenderEnum),
            default: GenderEnum.MALE,
        },
        provider: {
            type: Number,
            enum: Object.values(ProviderEnum),
            default: ProviderEnum.SYSTEM,
        },
        role:{
            type:Number,
            enum: Object.values(RoleEnum),
            default:RoleEnum.USER
        },
        confirmEmail: Date,
        profilePic: String,
        coverPic: [String],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: {virtuals:true},
    },
);

userSchema.virtual("username").set(function (value) {
    const [firstName, lastName] = value.split(" ") || [];
    this.set({firstName , lastName});
}).get(function () {
    return `${this.firstName} ${this.lastName}`
})


const userModel = mongoose.model("User",userSchema);

export default userModel;