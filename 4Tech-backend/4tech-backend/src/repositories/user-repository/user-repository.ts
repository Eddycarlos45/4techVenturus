import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import{User} from 'src/domain/schemas/user.schema';
@Injectable()
export class UserRepositoryService {
	constructor(
		@InjectModel('User') private readonly userCollection: Model<User>){

		}

	async getUsers(): Promise<User[]> {
		return await this.userCollection
		.find()
		.lean();
	}
	async createUser(newUser: UserViewModel) {
		const user = this.userCollection(newUser);
		return await user.save();
		// this.db.push(newUser);
		// return 'User sucessfully added';
	}
	updateUser(newUser:UserViewModel){
		// this.db.push(newUser);
		// return 'User update';
	}
}
