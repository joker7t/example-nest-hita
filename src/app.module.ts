import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google-login/google.strategy';
import { FacebookStrategy } from './facebook-login/facebook.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

const DB_URI = process.env.DB_URI;

@Module({
  imports: [
    MongooseModule.forRoot(DB_URI, { useNewUrlParser: true }),
    UserModule,
    UserService,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, FacebookStrategy],
})
export class AppModule {}
