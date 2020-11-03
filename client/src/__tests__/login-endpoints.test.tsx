import '@testing-library/jest-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

describe('/admin/login endpoint', () => {
  it('allows sign in correctly', (done) => {
    axios.post(`${API_BASE_URL}/admin/login`, {
      username: 'Brady',
      password: 'RescueOrion!',
    })
      .then((res) => {
        expect(res.data?.token).toBeDefined();
        done();
      })
      .catch((err) => done(err));
  });

  it('rejects incorrect password', (done) => {
    axios.post(`${API_BASE_URL}/admin/login`, {
      username: 'Brady',
      password: 'RescueOrion',
    })
      .then((res) => {
        expect(res.data?.token).toBeDefined();
        done(new Error('Should not be authenticated'));
      })
      .catch((err) => {
        if (err.response) {
          expect(err.response.data).toMatch('Wrong password for user: Brady');
          done();
        } else {
          done(err);
        }
      });
  });

  it('rejects incorrect username', (done) => {
    axios.post(`${API_BASE_URL}/admin/login`, {
      username: 'Bradyy',
      password: 'RescueOrion',
    })
      .then((res) => {
        expect(res.data?.token).toBeDefined();
        done(new Error('Should not be authenticated'));
      })
      .catch((err) => {
        if (err.response) {
          expect(err.response.data).toMatch('Unauthorized user: Bradyy');
          done();
        } else {
          done(err);
        }
      });
  });
});