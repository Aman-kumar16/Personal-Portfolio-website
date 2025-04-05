import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.createCodeRain();
    this.animateText();
  }

  createCodeRain(): void {
    const backgroundAnimation = this.el.nativeElement.querySelector(
      '.background-animation'
    );
    const numberOfCharacters = window.innerWidth / 5;

    for (let i = 0; i < numberOfCharacters; i++) {
      const span = this.renderer.createElement('span');
      span.textContent = this.getRandomCharacter();
      const initialX = Math.random() * window.innerWidth;
      const initialDelay = Math.random() * 3;

      this.renderer.setStyle(span, 'left', `${initialX}px`);
      this.renderer.setStyle(span, 'animation-delay', `-${initialDelay}s`);
      this.renderer.appendChild(backgroundAnimation, span);
    }
  }

  getRandomCharacter(): string {
    const characters = '01$#%&@01';
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }

  animateText(): void {
    const animatedElements =
      this.el.nativeElement.querySelectorAll('.animated-text');
    animatedElements.forEach((element: HTMLElement) => {
      const text = element.textContent;
      if (text) {
        element.textContent = '';
        this.typeWriter(element, text, 75);
      }
    });
  }

  typeWriter(element: HTMLElement, text: string, speed: number, index: number = 0): void {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(() => this.typeWriter(element, text, speed, index + 1), speed);
    }
  }
}