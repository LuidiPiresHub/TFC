import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import {
  user,
  invalidEmail,
  validUser,
  noEmail,
  noPassword,
} from './mocks/login.mock';
import User from '../database/models/Users.model';
import { IToken } from '../interfaces/login'

chai.use(chaiHttp);

const { expect } = chai;
const VALID_TOKEN = 'VALID_TOKEN';

describe('Testes da rota /login', () => {
  describe('Testa fazer login sem email e senha', () => {
    it('Retorna um status 400', async () => {
      const { body, status } = await chai.request(app).post('/login');
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
    });
  });

  describe('Testa receber um email inválido', () => {
    beforeEach(async () => sinon.stub(User, 'findOne').resolves(null));
    afterEach(() => sinon.restore());

    it('Retorna um status 401 e uma mensagem de erro', async () => {
      const { body, status } = await chai.request(app).post('/login').send(invalidEmail);
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  });

  describe('Testa aplicação sem preencher os campos de login', () => {
    beforeEach(() => sinon.stub(Model, 'findOne').rejects(user as User));
    afterEach(() => sinon.restore());

    it('Retorna um status 400 se inserido apenas a password', async () => {
      const { body } = await chai.request(app).post('/login').send(noEmail);
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('Retorna um status 400 se inserido apenas o email', async () => {
      const { status } = await chai.request(app).post('/login').send(noPassword);
      expect(status).to.equal(400);
    });
  });
});

describe('Testes da rota login/validate', () => {
  describe('Quando o login não for aprovado', () => {
    beforeEach(() => {
      sinon.stub(User, 'findByPk').resolves({ id: 1 } as IToken | any);
    });
    afterEach(() => sinon.restore());

    it('Retorna um status 401 e uma mensagem de erro de token', async () => {
      const { body, status } = await chai.request(app).get('/login/validate').set('Authorization', VALID_TOKEN);
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid or Expired token' });
    });
  });
});

describe('Testes da rota GET /login/validate com sucesso ', () => {
  describe('Quando o login for aprovado', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findByPk').resolves(user as IToken | any);
    });
    afterEach(() => sinon.restore());

    it('Retorna um status 200 e a role admin', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(validUser);
      const { body, status } = await chai.request(app).get('/login/validate').set('Authorization', token);
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ role: 'admin' });
    });

  });
});