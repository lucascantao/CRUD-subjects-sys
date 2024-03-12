import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { UsuarioService } from "./usuario.service"

export const authGuard = () => {
    const router = inject(Router)
    const usuarioService = inject(UsuarioService)
    usuarioService.fetchUser().then(
        () => {return true;}, 
        () => {
            router.navigateByUrl('/login')
            return false;
        })

}