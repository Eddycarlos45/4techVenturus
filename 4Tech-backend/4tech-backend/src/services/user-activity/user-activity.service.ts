import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/user-repository/user-repository';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comment.dto';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityRepository } from 'src/repositories/user-activity-repository/user-activity.repository';
import { UserActivity } from 'src/domain/schemas/user-activity.schema';
import { readFileSync } from 'fs';

@Injectable()
export class UserActivityService {
	constructor(
		private readonly userActivityRepository: UserActivityRepository,
		private readonly userRepository: UserRepositoryService) {

	}

	async getRecentUploads(index: string) {
		const indexAsNumber = parseInt(index, 10);
		if (isNaN(indexAsNumber)) {
			throw new BadRequestException('Invalid Index');
		}
		const recentsUploads = await this.userActivityRepository.getPaged(indexAsNumber);
		return this.convertimagesToBase64(recentsUploads);
	}

	async uploadImage(userId: string, filename: string, description: string) {
		const user = await this.userRepository.getById(userId);
		if (!user) {
			throw new BadRequestException('This user does not exist');
		}

		const uploadImageObj = new UserActivityDto(userId, filename, user.userName);
		if (description) {
			uploadImageObj.comments.push(new UserActivityCommentDto(
				userId,
				user.userName,
				description,
			));
		}

		return await this.userActivityRepository.create(uploadImageObj);
	}

	convertimagesToBase64(userActivities: UserActivity[]) {
		return Promise.all(
			userActivities.map(userActivity => {
				return {
					...userActivity,
					imgEncoded: readFileSync('../images/' + userActivity.fileName, 'base64'),
				};
			}),
		);
	}
}
