import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {

    if(!request.headers.has('login')){
        const token = localStorage.getItem('token') ?? '';
        request = request.clone({
            setHeaders: {
                Authorization: token ? `Bearer ${token}` : ``,
            }
        });
    }


    return next(request);
}