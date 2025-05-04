import { type JwtPayload, jwtDecode } from 'jwt-decode';

// TODO: What is the purpose of extending the JwtPayload interface?
interface ExtendedJwt extends JwtPayload {
  data:{
    username:string,
    email:string,
    id:string
  }
};

class AuthService {
  // TODO: What is this method supposed to do?
  getProfile() {
    // TODO: Why is jwtDecode being used here and what does it return?
    return jwtDecode<ExtendedJwt>(this.getToken());
  }

  // TODO: What is the purpose of this method?
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // TODO: What is the purpose of this method?
  isTokenExpired(token: string) {
    try {
      // TODO: What is jwtDecode doing with the token here?
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  // TODO: What is the purpose of this method?
  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  // TODO: What is the purpose of this method?
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // TODO: What is the purpose of this method?
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
