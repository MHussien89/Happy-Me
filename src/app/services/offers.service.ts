import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Offer } from '../models/offer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class OffersService {
    constructor(private http: Http) { }

    getOffers(userId: string) {
        return this.http.get('http://95.177.208.232:8080/happyme-webservice/offer/' + userId, this.jwt()).map((response: Response) => response.json());
    }

    getOfferById(offerId: string) {
        return this.http.get('http://95.177.208.232:8080/happyme-webservice/offer/' + offerId + ' /data', this.jwt()).map((response: Response) => response.json());
    }

    // addOfferImage(image: any) {
    //     return this.http.get('http://95.177.208.232:8080//happyme-webservice/offer/image/7', this.jwt()).map((response: Response) => response.json());
    // }

    addNewOffer(offer: Offer) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
        // headers.append('Access-Control-Allow-Credentials', 'true');
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://95.177.208.232:8080/happyme-webservice/offer/1',
            JSON.stringify({
                title: offer.title,
                description: offer.description,
                start: offer.start,
                end: offer.end
            }), options)
            .map((response: Response) => response.json());
    }

    editOffer(offer: Offer) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
        // headers.append('Access-Control-Allow-Credentials', 'true');
        let options = new RequestOptions({ headers: headers });
        return this.http.put('http://95.177.208.232:8080/happyme-webservice/offer/1',
            JSON.stringify({
                id: offer.id,
                title: offer.title,
                description: offer.description,
                start: offer.start,
                end: offer.end
            }), options)
            .map((response: Response) => response.json());
    }

    addOfferImage(offerId: string, image: any) {
        let headers = new Headers({});
        var fd = new FormData();
        fd.append('image', image);
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:3001');
        // headers.append('Access-Control-Allow-Credentials', 'true');
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://95.177.208.232:8080/happyme-webservice/offer/image/' + offerId,
            fd, options);
    }

    deleteOffer(id: string) {
        return this.http.delete('http://95.177.208.232:8080/happyme-webservice/offer/' + id, this.jwt());
    }


    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token, 'Content-Type': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }
}