import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/schemas/user.schema';
@Injectable()
export class UserRepositoryService {

	constructor(
		@InjectModel('User') private readonly userCollection: Model<User>) {

	}

	async getById(id: string): Promise<User> {
		return await this.userCollection
			.findOne({ _id: id })
			.lean();
	}
	async getByCredentials(userLoginFromViewModel: string, passwordFromViewModel: string) {
		return await this.userCollection
			.findOne({
				userLogin: userLoginFromViewModel,
				password: passwordFromViewModel
			})
			.lean();
	}
	async getUsers(): Promise<User[]> {
		return await this.userCollection
			.find()
			.select({ __v: false, password: false })
			.lean();
	}
	async createUser(newUser: UserViewModel) {
		const user = new this.userCollection(newUser);
		return await user.save();
	}
	async updateUser(updateUser: UserViewModel) {
		const update = await this.userCollection.findOneAndUpdate(
			{ _id: updateUser.userId },
			updateUser,
			{ new: true });
		return await update.save();
	}

	async deleteUser(deleteUser: UserViewModel) {
		const del = await this.userCollection.findOneAndDelete(
			{ _id: deleteUser.userId });
			return 'Successfully Deleted';
	}
}
