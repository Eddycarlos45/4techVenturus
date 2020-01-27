import { Controller, Get, Post, Body, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

	constructor(private userService: UserService) {

	}
	@UseGuards(AuthGuard('jwt'))
	@Get()
	returnUser() {
		return this.userService.getUsers();
	}
	@Post()
	createUser(@Body() newUser: UserViewModel) {
		return this.userService.createNewUser(newUser);
	}
	@Put()
	updateUser(@Body() updateUser: UserViewModel) {
		return this.userService.updateUser(updateUser);
	}
	@Delete()
	deleteUser(@Body() deleteUser: UserViewModel){
		return this.userService.deleteUser(deleteUser);
	}
}
