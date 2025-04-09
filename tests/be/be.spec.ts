import { test, expect, APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';
import { TestConfig } from '../../src/types/globalTypes';

dotenv.config(); // Simplified dotenv call

const env = process.env.ENV || 'dev';
const cfg: TestConfig = require(`../../data/envs/config_${env}.json`);

const usersUrl = (id?: number) => `${cfg.apiEndpoint}api/v1/Users${id ? `/${id}` : ''}`;

const userPayload = {
    id: 99,
    userName: 'TestUserAlpha',
    password: 'TestPasswordOmega'
};

test.describe('User Endpoint Tests @crud @regression', () => {

    test('Create User (POST)', async ({ request }) => {
        const res = await request.post(usersUrl(), { data: userPayload });
        expect(res.status()).toBe(200);
        console.log('POST res:', await res.json());
    });

    test('Get All Users (GET)', async ({ request }) => {
        const res = await request.get(usersUrl());
        expect(res.status()).toBe(200);
    });

    test('Get Specific User (GET by ID)', async ({ request }) => {
        const res = await request.get(usersUrl(userPayload.id));
        expect(res.status()).toBe(200);
        const user = await res.json();
        console.log('GET/:id res:', user);
        expect(user.userName).toEqual(userPayload.userName);
    });

    test('Update User (PUT)', async ({ request }) => {
        const updatedData = { ...userPayload, userName: 'UpdatedUserNameBeta' };
        const res = await request.put(usersUrl(userPayload.id), { data: updatedData });
        expect(res.status()).toBe(200);
        const updatedUser = await res.json();
        console.log('PUT res:', updatedUser);
        expect(updatedUser.userName).toBe(updatedData.userName);
    });

    test('Delete User (DELETE)', async ({ request }) => {
        const res = await request.delete(usersUrl(userPayload.id));
        console.log('DELETE status:', res.status());
        expect(res.status()).toBe(200);
    });
});