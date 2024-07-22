export const createUserValidationSchema = {
    username: {
        isLength :{
            options: {
                min: 5,
                max:32,
            },
            errorMessage: "Username must be at least 5 characters "
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: {
            errorMessage: "Username must be a string"
        }
    },
    displayname: {
        notEmpty: true
    },
    password: {
        notEmpty:true,
    }
} 