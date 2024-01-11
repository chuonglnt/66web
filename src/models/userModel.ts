import { GenderType } from "@/core/globalEnum";

export interface UserModel {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDay: Date;
  gender: GenderType;
  defaultAddress: string;
  shippingAddress: string;
  userPhone: string;
  imageUserUrl: string;
  // additionalInfo?: Record<string, any>;
}
// class UserModel implements IUser {
//   id: number;
//   userName: string;
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   birthDay: Date;
//   gender: string;
//   defaultAddress: string;
//   shippingAddress: string;
//   userPhone: string;
//   imageUserUrl: string;
//   // additionalInfo?: Record<string, any>;

//   constructor({
//     id,
//     userName,
//     email,
//     password,
//     firstName,
//     lastName,
//     birthDay,
//     gender,
//     defaultAddress,
//     shippingAddress,
//     userPhone,
//     imageUserUrl,
//   }: IUser) {
//     this.id = id;
//     this.userName = userName;
//     this.email = email;
//     this.password = password;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.birthDay = birthDay;
//     this.gender = gender;
//     this.defaultAddress = defaultAddress;
//     this.shippingAddress = shippingAddress;
//     this.userPhone = userPhone;
//     this.imageUserUrl = imageUserUrl;
//     // additionalInfo?: Record<string, any>;
//   }

// toJSON(): Object {
//   return {
//     id: this.id,
//     userName: this.userName,
//     email: this.email,
//     password: this.password,
//     firstName: this.firstName,
//     lastName: this.lastName,
//     birthDay: this.birthDay,
//     gender: this.gender,
//     defaultAddress: this.defaultAddress,
//     shippingAddress: this.shippingAddress,
//     userPhone: this.userPhone,
//     imageUserUrl: this.imageUserUrl,
//     // additionalInfo?: Record<string, any>;
//   };
// }
// }

export default UserModel;
