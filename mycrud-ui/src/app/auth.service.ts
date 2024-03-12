import { Injectable, signal } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentSig = signal<Usuario | undefined | null>(undefined);

}
