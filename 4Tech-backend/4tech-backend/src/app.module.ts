import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller'
import { UserService } from './services/user/user.service';
import { UserRepositoryService } from './repositories/user-repository/user-repository';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { createSecretKey } from 'crypto';
import { secretKey, JwtStrategy } from './services/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './domain/schemas/user.schema';
import { UserActivityController } from './controllers/user-activity/user-activity.controller';
import { UserActivitySchema } from './domain/schemas/user-activity.schema';
import { UserActivityService } from './services/user-activity/user-activity.service';
import { UserActivityRepository } from './repositories/user-activity-repository/user-activity.repository';
import { UserActivityDto } from './domain/dto/user-activity.dto';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/admin',
      {
        useNewUrlParse: true,
        useUnifiedTopology: true,
      }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'UserActivity', schema: UserActivitySchema },
    ]),
    JwtModule.register(
      {
        secret: secretKey, signOptions: {
          expiresIn: '600m',
        },
      }),
  ],
  controllers: [AppController, UserController, AuthController, UserActivityController],
  providers: [AppService, UserService, UserRepositoryService, AuthService, 
    JwtStrategy,UserActivityService,UserActivityRepository,UserActivityDto,WebsocketGateway],
})
export class AppModule { }
