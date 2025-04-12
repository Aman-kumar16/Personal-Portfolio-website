import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  resumeUrl = 'assets/ResumeAmanKumar.pdf';
  safeResumeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.safeResumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.resumeUrl);
  }
}
