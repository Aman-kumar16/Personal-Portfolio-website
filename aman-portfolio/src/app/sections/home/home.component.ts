import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('matrixCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId: number;
  private intervalId: number;

  constructor(private el: ElementRef) {
    this.animationFrameId = 0;
    this.intervalId = 0;
  }

  ngOnInit(): void {
    // Initialize canvas and context
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.initCanvas();
    this.initDrops(); // Initialize drops with random values
    this.drawMatrix();
    this.intervalId = window.setInterval(() => {
      this.changeCharacterSet();
    }, 10000);
    this.animateText();
  }

  ngOnDestroy(): void {
    // Clean up animation frame and interval
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  initCanvas(): void {
    if (this.canvas?.nativeElement) {
      this.canvas.nativeElement.width = window.innerWidth;
      this.canvas.nativeElement.height = window.innerHeight;
    }
  }

  private characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_-+={}[]|;:<>,.?/`';
  private japaneseCharacters =
    'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
  private allCharacters = this.characters + this.japaneseCharacters;
  private fontSize = 16;
  private columns = Math.floor(window.innerWidth / this.fontSize);
  private drops: number[] = []; // Change drops to number[]
  private characterSets = [
    this.characters,
    this.japaneseCharacters,
    this.allCharacters,
  ];
  private currentCharacterSetIndex = 0;

  // New function to initialize drops with random values
  private initDrops(): void {
    this.drops = []; // Clear first
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.floor(Math.random() * this.canvas.nativeElement.height);
    }
  }

  getRandomCharacter(charSet: string): string {
    return charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  drawMatrix = () => {
    if (!this.ctx || !this.canvas?.nativeElement) return;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    this.ctx.fillRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    this.ctx.font = `${this.fontSize}px Courier New`;

    for (let i = 0; i < this.drops.length; i++) {
      const currentSet = this.characterSets[this.currentCharacterSetIndex];
      const text = this.getRandomCharacter(currentSet);
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      const colorValue = 100 + Math.random() * 155;
      this.ctx.fillStyle = `rgb(0, ${colorValue}, 0)`;
      this.ctx.shadowColor = `rgb(0, ${colorValue}, 0)`;
      this.ctx.shadowBlur = 8;

      this.ctx.fillText(text, x, y);
      this.ctx.shadowBlur = 0;

      if (y > this.canvas.nativeElement.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
    this.animationFrameId = requestAnimationFrame(this.drawMatrix);
  };

  changeCharacterSet() {
    this.currentCharacterSetIndex =
      (this.currentCharacterSetIndex + 1) % this.characterSets.length;
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

  typeWriter(
    element: HTMLElement,
    text: string,
    speed: number,
    index: number = 0
  ): void {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(() => this.typeWriter(element, text, speed, index + 1), speed);
    }
  }
}

