const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export class HTTP {        

        static API_URL = "https://ya-praktikum.tech/api/v2";

        protected endpoint:string;

        constructor(endpoint:string){
                this.endpoint = `${HTTP.API_URL}${endpoint}`;
        }

    public get<Response> (path: string, options = {}):Promise<Response> {             
            return this.request<Response>(this.endpoint + path, {...options, method: METHODS.GET}, options.timeout);
    };

    public post<Response = void>(path: string, options = {}) {
            return this.request(this.endpoint + path, {...options, method: METHODS.POST}, options.timeout);
    };

    public put<Response = void> (path: string, options = {}) {
            return this.request(this.endpoint + path, {...options, method: METHODS.PUT}, options.timeout);
    };

    public delete<Response> (path: string, options = {}) { 
            return this.request(this.endpoint + path, {...options, method: METHODS.DELETE}, options.timeout);
    };

    public request<Response>(url:string, options = {}, timeout = 5000):Promise<Response> {
            const {headers = {}, method, data, withCredentials} = options;

            console.log(headers);
            console.log(withCredentials);

            return new Promise(function(resolve, reject) {
                        if (!method) {
                            reject('No method');
                            return;
                        }

                        const xhr = new XMLHttpRequest();
                        const isGet = method === METHODS.GET;

                        xhr.open( method, url,);
                        xhr.withCredentials = withCredentials;

                        Object.keys(headers).forEach(key => {
                            xhr.setRequestHeader(key, headers[key]);
                        });
            
                        xhr.onload = function() {
                            resolve(xhr);
                        };
            
                        xhr.onabort = reject;
                        xhr.onerror = reject;
            
                        xhr.timeout = timeout;
                        xhr.ontimeout = reject;
                    
                        if (isGet || !data) { xhr.send(); } 
                        else { xhr.send(data); }
          });
    };
};


