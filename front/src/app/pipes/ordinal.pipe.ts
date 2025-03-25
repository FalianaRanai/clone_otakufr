import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinalDate',
  standalone: true  // ← Add this for standalone pipes
})

export class OrdinalDatePipe implements PipeTransform {
  transform(dateString: string | Date | null | undefined): string {
    // Handle null/undefined cases
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Get ordinal suffix
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    
    return `${month} ${day}${suffix}, ${year}`;
  }
}