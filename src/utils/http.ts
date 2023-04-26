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

        private _queryStringify(data:any){
                const urlParams = new URLSearchParams(data);
                return urlParams.toString();              	
        }

        public get (path: string, options = {}) {             
            return this.request(this.endpoint + path, {...options, method: METHODS.GET});
        };

        public post(path: string, options = {}) {
            return this.request(this.endpoint + path, {...options, method: METHODS.POST});
        };

        public put (path: string, options = {}) {
            return this.request(this.endpoint + path, {...options, method: METHODS.PUT});
        };

        public delete (path: string, options = {}) { 
            return this.request(this.endpoint + path, {...options, method: METHODS.DELETE});
        };

        public request(url:string, options = {}, timeout = 5000) {
            const {headers = {}, method, data} = options,
                self = this;

           return new Promise(function(resolve, reject) {
                        if (!method) {
                            reject('No method');
                            return;
                        }

                        const xhr = new XMLHttpRequest();
                        const isGet = method === METHODS.GET;

                        if(isGet && data){
                                url= `${url}?${self._queryStringify(data)}`;
                        }

                        xhr.open( method, url,);
                        xhr.withCredentials = true;

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


