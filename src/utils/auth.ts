import { betterAuth } from 'better-auth';
import { db } from '../db/index';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg'
    }),
    socialProviders: {
        'google': {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirectURI: process.env.BASE_URL+'/api/auth/callback/google',
        }
    },
    baseURL: process.env.BASE_URL as string,  
    user: {
        additionalFields: {
            phoneNumber: {
                type: "string",
                unique: true,
                defaultValue: null,
                required: false
            },
            phoneNumberVerified: {
                type: "boolean",
                defaultValue: false,
                required: true
            }
        }
    }
})