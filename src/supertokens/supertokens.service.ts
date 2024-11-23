import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as process from 'node:process';
import { TVerifySessionResponse } from './types/VerifySessionResponse';

@Injectable()
export class SupertokensService {
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
}
