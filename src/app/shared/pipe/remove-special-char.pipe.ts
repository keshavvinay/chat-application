import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name : 'removeSpecialCharPipe'
})

export class RemoveSpecialCharPipe implements PipeTransform{
    transform(value: any, character: string) :string {
        return value.replace(character, '')
        //throw new Error('Method not implemented.');
    }

}