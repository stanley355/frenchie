import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as process from 'node:process';
import supertokens, { RecipeUserId } from 'supertokens-node';
import { TVerifySessionResponse } from './types/VerifySessionResponse';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

@Injectable()
export class SupertokensService {
  constructor() {
    supertokens.init({
      supertokens: {
        connectionURI: process.env.SUPERTOKENS_API_URL,
        apiKey: process.env.SUPERTOKENS_API_KEY,
      },
      appInfo: {
        appName: process.env.APP_NAME,
        apiDomain: process.env.HOST,
        websiteDomain: process.env.FRONTEND_HOST,
        apiBasePath: '/',
        websiteBasePath: '/',
      },
      recipeList: [EmailPassword.init()],
    });
  }

  async verifySession(accessToken: string): Promise<TVerifySessionResponse> {
    try {
      const supertokensApiUrl = process.env.SUPERTOKENS_API_URL;
      const supertokensApiKey = process.env.SUPERTOKENS_API_KEY;
      const supertokensData = {
        accessToken,
        enableAntiCsrf: false,
        doAntiCsrfCheck: false,
        checkDatabase: true,
      };
      const { data } = await axios.post(
        `${supertokensApiUrl}/recipe/session/verify`,
        supertokensData,
        { headers: { Authorization: `Bearer ${supertokensApiKey}` } },
      );
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    try {
      const tenantId = process.env.SUPERTOKENS_TENANT_ID;
      const isCredentialValid = await EmailPassword.verifyCredentials(
        tenantId,
        changePasswordDto.email,
        changePasswordDto.oldPassword,
      );
      if (isCredentialValid.status !== 'OK') {
        throw new BadRequestException(isCredentialValid.status);
      }

      const recipeUserId = new RecipeUserId(changePasswordDto.userId);
      return await EmailPassword.updateEmailOrPassword({
        recipeUserId: recipeUserId,
        password: changePasswordDto.newPassword,
        tenantIdForPasswordPolicy: tenantId,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
