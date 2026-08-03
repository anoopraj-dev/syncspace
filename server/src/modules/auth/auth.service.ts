import bcrypt from 'bcrypt';
import { ApiError } from '../../utils/ApiError.js';
import HTTP_STATUS from '../../constants/http-status.js';
import { findUserByEmail, createUser, findByUsername } from './auth.repository.js';
import type { RegisterInput } from './auth.validataion.js';
import { toUserResponseDto } from './dto/user-response.dto.js';

export async function signupService(data:RegisterInput){

    //existing email
    const existingEmail = await findUserByEmail(data.email);

    if(existingEmail){
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            'Email already exists'
        )
    }

    // existing username
    const existingUsername = await findByUsername(data.username);

    if(existingUsername) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            'Username is already chosen'
        )
    }

    // hash password
    const hashedPassword = await bcrypt.hash(data.password,10);

    const user = await createUser({
        ...data,
        password: hashedPassword,
    })

    return toUserResponseDto(user)

}