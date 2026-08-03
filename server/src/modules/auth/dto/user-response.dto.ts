import { UserDocument } from "../../../models/user.model.js";

export function toUserResponseDto(user:UserDocument){
    return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        isVerified: user.isVerified,
    }
}