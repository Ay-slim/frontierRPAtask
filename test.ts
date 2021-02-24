import { expect } from 'chai';
import { agent as request } from 'supertest';
import app from './index';
import { FORM_URL } from './index'
import faker from 'faker';

describe('Frontier sample application form tests', () => {
    it('successfully sends candidate information', async () => {
      const res = await request(app)
        .post(`${FORM_URL}`)
        .set('Accept', 'application/json')
        .send({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          phone: '+023040281002',
          location: 'Oregon',
          linkedin: 'linkedin.com/dangbanaorisha',
          resume: "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx"
        });
  
      expect(res.status).to.equal(201);
      expect(res.body).to.haveOwnProperty('data');
      expect(res.body).to.haveOwnProperty('message');
    })  
  
    it('rejects a request with missing required data', async () => {
      const res = await request(app)
        .post(`${FORM_URL}`)
        .set('Accept', 'application/json')
        .send({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            phone: faker.phone.phoneNumber(),
            location: faker.address.city(),
            linkedin: faker.internet.url(),
            resume: "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx"
          });
  
      expect(res.status).to.equal(422);
    })
  });
  