
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {
    transform(value: string): string {
        const start: number = 0;
        const lenght: number = 15;
        return value.length > lenght ? value.substr(start, lenght) + ' ...' : value;
    }
}