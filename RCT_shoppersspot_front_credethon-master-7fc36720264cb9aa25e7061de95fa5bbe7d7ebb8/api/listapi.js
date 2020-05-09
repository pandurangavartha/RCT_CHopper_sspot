import apiurl from '../constant'

console.log('-------------2---------------listApi.js--')

class listApi {

    static requestHeaders() {
        return { 'AUTHORIZATION': `Bearer ${sessionStorage.jwt}` }
    }

    static getProfileDetails() {
        console.log('--------this.requestHeaders()------',this.requestHeaders())
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        var apiurlgiven = apiurl + '/user/' + localStorage.getItem('user_id');
        const request = new Request(apiurlgiven, {
            method: 'GET',
            headers: headers,
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }


    static updateUserDetails(cat) {
        console.log('--------------application/json--------------------')
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        const request = new Request(`${apiurl}/user/${cat.id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(cat)
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    
    static getAllList() {
        // console.log('--------this.requestHeaders()------',this.requestHeaders())
        const headers = this.requestHeaders();
        const request = new Request(`${apiurl}/todos`, {
            method: 'GET',
            //headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static updateCat(cat) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        const request = new Request(`${apiurl}/api/v1/cats/${cat.id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({ cat: cat })
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static deleteFromList(cat) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        const request = new Request(`${apiurl}/${cat.id}`, {
            method: 'DELETE',
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static createCat(cat) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        const request = new Request(`${apiurl}/api/v1/cats`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ cat: cat })
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static addintoList(cat) {
        console.log('is it coming here ', cat)
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        const request = new Request(`${apiurl}/todos`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(cat)
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static uploadTheProduct(productdata) {
        const headers = Object.assign(this.requestHeaders());
        const request = new Request(`${apiurl}/products/product`, {
            method: 'POST',
            headers: headers,
            body: productdata
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static getproducts() {
        const request = new Request(`${apiurl}/product`, {
            method: 'GET'
        });
        return fetch(request).then(response => {
            console.log("response------------------", response)
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        }).then(response => {
            console.log(response, 'kkkkkkkk')
            // if (response.status) {
            // }
            return response;
        });
    }

    static redirectToLogin(productdata) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        const request = new Request(`${apiurl}/user/login`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(productdata)
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }


    static registerTheuser(productdata) {
        console.log('-----ListAPi----------productdata--------', productdata)
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        const request = new Request(`${apiurl}/user/register`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(productdata)
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }


    static addproductstocart(productdata) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        const request = new Request(`${apiurl}/add-doc-details`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(productdata)
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static getlistofcart(productdata) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        var apiurlgiven = apiurl + '/addcarts/doc-details/' + localStorage.getItem('user_id');
        const request = new Request(apiurlgiven, {
            method: 'GET',
            headers: headers,
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static productorder(productdata) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        var apiurlgiven = apiurl + '/add-orders';
        const request = new Request(apiurlgiven, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(productdata)
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static getorderedproducts(productdata) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        var apiurlgiven = apiurl + '/orders-details/' + localStorage.getItem('user_id');
        const request = new Request(apiurlgiven, {
            method: 'GET',
            headers: headers,
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static getselectedproducts(producttype) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        var apiurlgiven = apiurl + '/product/' + producttype;
        const request = new Request(apiurlgiven, {
            method: 'GET',
            headers: headers,
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static viewtheselectedImage(imageid) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        if (window.location.href.split('/')[5] != undefined) {
            var urlpresent = window.location.href.split('/')[4] + '/' + window.location.href.split('/')[5];
        } else {
            urlpresent = window.location.href.split('/')[4];
        }
        var apiurlgiven = apiurl + '/getProductById/' + imageid;
        const request = new Request(apiurlgiven, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ urlpath: urlpresent })
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static deleteimageapi(imageid) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        var apiurlgiven = apiurl + '/delete-product/' + imageid;
        const request = new Request(apiurlgiven, {
            method: 'DELETE',
            headers: headers,
        });
        return fetch(request).then(response => {
            return imageid;
        }).catch(error => {
            return error;
        });
    }
    static cancelorderapi(orderid, cancelid) {
        console.log(orderid, 'orderid')
        const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
        var apiurlgiven = apiurl + '/deleteo-rders-from-orderhistory/' + cancelid + '/' + orderid;
        const request = new Request(apiurlgiven, {
            method: 'DELETE',
            headers: headers,
        });
        return fetch(request).then(response => {
            return orderid;
        }).catch(error => {
            return error;
        });
    }
}

export default listApi;
