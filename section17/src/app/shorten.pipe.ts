
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {
    transform(value: string, start: number, limit: number): string {
        return value.length > limit ? value.substr(start, limit) + ' ...' : value;
    }
}