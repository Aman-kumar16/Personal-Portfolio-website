import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  email = 'kumar.aman.developer@gmail.com';
  linkedin = 'https://www.linkedin.com/in/aman-kumar-6a4554196/';
  github = 'https://github.com/Aman-kumar16';
  phoneGerman = '+49 15510600874';
  phoneIndian = '+91 9858001981';

  emailIcon = faEnvelope;
  linkedinIcon = faLinkedin;
  githubIcon = faGithub;
  phoneIcon = faPhone;

  @ViewChild('contactCanvas', { static: true }) contactCanvas!: ElementRef<HTMLCanvasElement>;
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D | null;
  nodes: { x: number; y: number; vx: number; vy: number }[] = [];  numNodes = 50;
  private animationFrameId: number | null = null;

  ngOnInit(): void {
    this.canvas = this.contactCanvas.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    this.initializeNetwork();
    this.animateNetwork();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initializeNetwork();
  }

  initializeNetwork(): void {
    this.nodes = [];
    for (let i = 0; i < this.numNodes; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.2, // Small random velocity in x
        vy: (Math.random() - 0.5) * 0.2, // Small random velocity in y
      });
    }
  }

  animateNetwork(): void {
    if (!this.context) return;
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.strokeStyle = '#444';
    this.context.lineWidth = 0.5;

    // Update node positions
    for (const node of this.nodes) {
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off the edges (optional, for continuous movement within bounds)
      if (node.x < 0 || node.x > this.canvas.width) {
        node.vx *= -1;
      }
      if (node.y < 0 || node.y > this.canvas.height) {
        node.vy *= -1;
      }
    }

    // Draw connections
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          this.context.beginPath();
          this.context.moveTo(this.nodes[i].x, this.nodes[i].y);
          this.context.lineTo(this.nodes[j].x, this.nodes[j].y);
          this.context.stroke();
        }
      }
    }

    // Highlight a random connection
    if (Math.random() < 0.005) { // Lower probability for slower pace
      const index1 = Math.floor(Math.random() * this.nodes.length);
      let index2 = Math.floor(Math.random() * this.nodes.length);
      while (index2 === index1) {
        index2 = Math.floor(Math.random() * this.nodes.length);
      }
      const dx = this.nodes[index1].x - this.nodes[index2].x;
      const dy = this.nodes[index1].y - this.nodes[index2].y;
      if (Math.sqrt(dx * dx + dy * dy) < 150) {
        this.context.strokeStyle = 'rgba(0, 255, 0, 0.7)';
        this.context.lineWidth = 1.5;
        this.context.beginPath();
        this.context.moveTo(this.nodes[index1].x, this.nodes[index1].y);
        this.context.lineTo(this.nodes[index2].x, this.nodes[index2].y);
        this.context.stroke();
      }
    }

    // Draw nodes
    this.context.fillStyle = '#555';
    for (const node of this.nodes) {
      this.context.beginPath();
      this.context.arc(node.x, node.y, 3, 0, Math.PI * 2);
      this.context.fill();
    }

    this.animationFrameId = requestAnimationFrame(this.animateNetwork.bind(this));
  }
}