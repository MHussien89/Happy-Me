import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getResellerUsers(userId: string) {
        return this.http.get('http://95.177.208.232:8080/happyme-webservice/user/' + userId, this.jwt()).map((response: Response) => response.json());
    }

    addNewRetailer(user: User) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
        // headers.append('Access-Control-Allow-Credentials', 'true');
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://95.177.208.232:8080/happyme-webservice/user/user/register',
            JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                password: user.password,
                nationality: 'EGP',
                creator: '1'
            }), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token, 'Content-Type': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}