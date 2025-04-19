import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects = [
    {
      name: 'Personal Portfolio Website',
      description: 'A portfolio website built with HTML, CSS, and Typescript to showcase my work, skills, and resume.',
      url: 'https://github.com/Aman-kumar16/Personal-Portfolio-website',
      tech: ['HTML', 'CSS', 'Typescipt']
    },
    {
      name: 'Currency Conversion Microservice',
      description: 'A Java application that performs real-time currency conversion by integrating with an external exchange rate API. It demonstrates effective use of REST API consumption and JSON parsing to calculate accurate conversions between various currencies.',
      url: 'https://github.com/Aman-kumar16/Currency-Conversion-Project',
      tech: ['Java', 'REST APIs', 'JSON', 'HTTP Client']
    }
  ];
}
