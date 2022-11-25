import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from './../src/users/user.model';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await User.create({ firstName: 'Hamid', lastName: 'Zahir' });
    await app.init();
  });

  afterEach(async () => {
    await User.destroy({
      where: {},
    });
    await app.close();
  });

  it('/users', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(1);
        expect(response.body[0].firstName).toBe('Hamid');
        expect(response.body[0].lastName).toBe('Zahir');
      });
  });
});
