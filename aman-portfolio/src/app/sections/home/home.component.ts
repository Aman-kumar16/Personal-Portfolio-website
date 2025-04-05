import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.animateText();
  }

  animateText(): void {
    const animatedElements = document.querySelectorAll('.animated-text') as NodeListOf<HTMLElement>;
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