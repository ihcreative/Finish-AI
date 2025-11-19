import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}