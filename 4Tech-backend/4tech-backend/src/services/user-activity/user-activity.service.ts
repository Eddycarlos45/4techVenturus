import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/user-repository/user-repository';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comment.dto';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityRepository } from 'src/repositories/user-activity-repository/user-activity.repository';
import { UserActivity } from 'src/domain/schemas/user-activity.schema';
import { readFileSync } from 'fs';
import { LikeOrDislikeViewModel } from 'src/domain/like-or-dislike.viewmodel';
import { identity } from 'rxjs';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

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

	async likeOrDislikeUserActivity(likeOrDislikeUserActivity: LikeOrDislikeViewModel) {
		const userActivity = await this.userActivityRepository.getById(likeOrDislikeUserActivity.userActivityId);
		if (!userActivity) {
			throw new BadRequestException('An User Activity with the given id does not exist');
		}
		const user = await this.userRepository.getById(likeOrDislikeUserActivity.userId);
		if (!user) {
			throw new BadRequestException('An User with the given id does not exist')
		}
		if (userActivity.likes.includes(user._id.toString())) {
			userActivity.likes = userActivity.likes.filter(x => x !== user._id.toString());
		} else {
			userActivity.likes.push(user._id.toString());
		}
		return await this.userActivityRepository.update(userActivity);
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

		const createdUserActivity = await this.userActivityRepository.create(uploadImageObj);
		return this.convertImageToBase64ForOneFile(createdUserActivity);
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
	convertImageToBase64ForOneFile(userActivity: UserActivity) {
		return {
			...userActivity,
			imgEncoded: readFileSync('../images/' + userActivity.fileName, "base64"),
		};
	}
}
