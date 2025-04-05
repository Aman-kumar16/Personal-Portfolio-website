import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = true;
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
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.initCanvas();
    this.initDrops();
    this.drawMatrix();
    this.intervalId = window.setInterval(() => {
      this.changeCharacterSet();
    }, 10000);
  }

  ngOnDestroy(): void {
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
      // Make sure the canvas is positioned absolutely behind other elements
      this.canvas.nativeElement.style.position = 'fixed';
      this.canvas.nativeElement.style.top = '0';
      this.canvas.nativeElement.style.left = '0';
      this.canvas.nativeElement.style.zIndex = '-1000'; // Ensure it's behind everything
    }
  }

  private characters = '01';
  private fontSize = 16;
  private columns = Math.floor(window.innerWidth / this.fontSize);
  private drops: number[] = [];
  private characterSets = [this.characters];
  private currentCharacterSetIndex = 0;
  private trailLength = 8;
  private dropSpeed = 0.7;
  private fadeOpacity = 0.85;

  private initDrops(): void {
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] =
        Math.floor(Math.random() * this.canvas.nativeElement.height) /
        this.trailLength;
    }
  }

  getRandomCharacter(charSet: string): string {
    return charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  drawMatrix = () => {
    if (!this.ctx || !this.canvas?.nativeElement) return;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
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
      let y = this.drops[i] * this.fontSize;

      for (let j = 0; j < this.trailLength; j++) {
        const drawY = y - j * this.fontSize;
        if (drawY < 0) continue;

        const opacity = Math.max(0, this.fadeOpacity - (j / this.trailLength) * this.fadeOpacity);
        this.ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;

        this.ctx.fillText(text, x, drawY);
      }

      this.drops[i] += this.dropSpeed;
      if (y > this.canvas.nativeElement.height) {
        this.drops[i] = 0;
      }
    }
    this.animationFrameId = requestAnimationFrame(this.drawMatrix);
  };

  changeCharacterSet() {
    this.currentCharacterSetIndex =
      (this.currentCharacterSetIndex + 1) % this.characterSets.length;
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.initCanvas(); // Re-initialize canvas on resize to adjust dimensions
    this.columns = Math.floor(window.innerWidth / this.fontSize); //Recalculate
  }
}

