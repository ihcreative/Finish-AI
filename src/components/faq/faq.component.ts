import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  activeIndex = signal<number | null>(null);

  faqs: FaqItem[] = [
    {
      question: 'What kind of projects can you finish?',
      answer: 'We can work with most modern web stacks. Our AI is trained on a vast corpus of code including JavaScript/TypeScript (React, Angular, Vue, Node.js), Python (Django, Flask), and more. Submit your repo, and we\'ll analyze its compatibility.'
    },
    {
      question: 'How does the AI code completion work?',
      answer: 'You provide us with your existing codebase and a description of the desired final state. Our AI analyzes the code, identifies missing pieces, and generates the necessary code to complete the features. Our human engineers then review, test, and integrate the code to ensure it meets our quality standards.'
    },
    {
      question: 'What if I don\'t have any code yet?',
      answer: 'While our specialty is completing existing projects, our \'Full-Stack AI\' plan can help you bootstrap a new application from a detailed specification. Contact us to discuss your idea.'
    },
    {
      question: 'Who owns the intellectual property of the generated code?',
      answer: 'You do. All code generated and delivered to you is your intellectual property. We retain no rights to the completed work.'
    },
    {
      question: 'Is the generated code secure and reliable?',
      answer: 'Absolutely. Security and reliability are our top priorities. All AI-generated code goes through a rigorous review and testing process by our senior engineers, including static analysis, vulnerability scanning, and comprehensive unit and integration tests.'
    }
  ];

  toggleFaq(index: number) {
    this.activeIndex.update(currentIndex => (currentIndex === index ? null : index));
  }
}