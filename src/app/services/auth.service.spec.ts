import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

  });

  it('should be created', () => {
    expect(authServiceSpy).toBeTruthy();
  });

  it('should states that the user is logged in when login is successful', (done: DoneFn) => {
    // login() will return this stub value.
    const stubValue = of(true);
    authServiceSpy.login.and.returnValue(stubValue);

    authServiceSpy.login('email@email.me', 'password').subscribe((isLoggedIn: boolean) => {
      expect(isLoggedIn).toBeTruthy();

      expect(authServiceSpy.login.calls.count()).toBe(1);

      done();
    }, () => {
      fail('no errors expected!');
    });

  });

  it('should return an error when login fails', () => {

    const stubResponse = throwError(() => new Error('bad credentials'));
    authServiceSpy.login.and.returnValue(stubResponse);

    authServiceSpy.login('bad-email@email.me', 'bad-password').subscribe(
      () => {
        fail('error expected');
      },
      (error: Error) => {
        expect(error.message).toContain('bad credentials');
      }
    );
  });
});
