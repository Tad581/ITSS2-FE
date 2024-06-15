
export interface IUserCreateInput {
    userName: string;
    passWord: string;
    role: number;
    avatarUrl: string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: string;
    fullName: string;
    firebaseId: string;
}

export interface IUser extends IUserCreateInput{
    uid: string;
}