
export interface IUserCreateInput {
    userName: string;
    passWord: string;
    role: number;
    avatarUrl: string;
    phoneNumber: string;
    gender: EGender;
    dateOfBirth: Date;
    fullName: string;
    firebaseId: string;
}

export interface IUser extends IUserCreateInput{
    uid: string;
}

export enum EGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}
