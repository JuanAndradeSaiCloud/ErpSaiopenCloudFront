import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;
  signInForm: UntypedFormGroup;
  showAlert: boolean = false;
  alert = {}
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['admin@test.com', [Validators.required, Validators.email]],
      password: ['development', Validators.required],
      rememberMe: [''],
    });
    const numberOfParticles: number = 50;

    // Obtén el grupo de partículas utilizando querySelector
    const particlesGroup: SVGGElement | null = document.querySelector<SVGGElement>('#particlesGroup');

    // Verifica si el grupo de partículas existe antes de continuar
    if (particlesGroup) {
      // Genera partículas aleatorias
      for (let i = 0; i < numberOfParticles; i++) {
        const particle: SVGCircleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        particle.setAttribute("cx", String(Math.random() * 960)); // Posición X aleatoria
        particle.setAttribute("cy", String(Math.random() * 540)); // Posición Y aleatoria
        particle.setAttribute("r", "5"); // Radio constante
        particle.setAttribute("fill", "currentColor"); // Color constante

        // Agrega la animación de movimiento a cada partícula
        const animateMotion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        animateMotion.setAttribute("repeatCount", "indefinite");
        animateMotion.setAttribute("dur", "2s");

        const mpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
        mpath.setAttribute("href", "#moveParticles");

        animateMotion.appendChild(mpath);
        particle.appendChild(animateMotion);

        particlesGroup.appendChild(particle);
      }
    }

    // Obtener una referencia a la imagen
    var logo2 = document.getElementById("logo2") as HTMLImageElement;

    // Array de nombres de archivo de imágenes
    var imagenes = ["mujer.png", "mujer2.png", "mujer3.png","hombre.png"];

    // Obtener un índice aleatorio
    var indiceAleatorio = Math.floor(Math.random() * imagenes.length);

    // Establecer la fuente de la imagen con la imagen aleatoria
    logo2.src = "assets/others/" + imagenes[indiceAleatorio];
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }
    this.signInForm.disable();
    this.showAlert = false;
    this._authService.signIn(this.signInForm.value).subscribe((response) => {
      console.log(response);
      localStorage.setItem('refresh', response.refresh);
      localStorage.setItem('access', response.access);
      const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '';
      this._router.navigateByUrl(redirectURL);
    }, (response) => {
      console.log(response);

      this.signInForm.enable();
      this.signInNgForm.resetForm();
      this.alert = { type: 'error', message: 'Wrong email or password' };
      this.showAlert = true;
    });
  }
}
