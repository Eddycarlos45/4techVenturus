import { Injectable, BadRequestException, Body } from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/user-repository/user-repository';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { LoginViewModel } from 'src/domain/login.viewmodel';
import { Model } from 'mongoose';
import { networkInterfaces } from 'os';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';

@Injectable()
export class UserService {


	constructor(readonly userRepository: UserRepositoryService,
		readonly userActivityDto: UserActivityDto) {

	}

	async updateUser(userId: string, newUser: UserViewModel) {
		const id = Model.findOneAndUpdate(
			userId,
			this.userActivityDto,
			{ new: true }
		);
		return this.userRepository.updateUser(newUser);
	}

	getUsers() {
		return this.userRepository.getUsers();
	}
	async createNewUser(newUser: UserViewModel) {

		const userList = await this.userRepository.getUsers();

		const existingUser = userList.find(user => user.userName === newUser.userName);

		if (existingUser) {
			newUser.password;
		}

		return this.userRepository.createUser(newUser);
	}

	async attemptLogin(login: LoginViewModel) {
		const userList = await this.userRepository.getUsers();

		const foundLogin = userList
			.find(x =>
				x.userLogin === login.userLogin &&
				x.password === login.password);

		return foundLogin;
	}
}
