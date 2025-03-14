import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: true
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | string[]): SafeResourceUrl | SafeResourceUrl[] {
    if (!value) return '';

    if (Array.isArray(value)) {
      return value.map(url => this.sanitizeUrl(url));
    } else {
      return this.sanitizeUrl(value);
    }
  }

  private sanitizeUrl(url: string): SafeResourceUrl {
    if (url.includes('watch?v=')) {
      url = url.replace('watch?v=', 'embed/');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
