import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/user-repository/user-repository';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comment.dto';

@Injectable()
export class UserActivityService {
	constructor(private readonly userRepository: UserRepositoryService) {

	}
	async uploadImage(userId: string, filename: string, description: string) {
		const user = await this.userRepository.getById(userId);
		if (!user) {
			throw new BadRequestException('This user does not exist');
		}

		const uploadImageObj = new UserActivityCommentDto(userId, filename, user.userName);

		return 'Upload';
	}
}
