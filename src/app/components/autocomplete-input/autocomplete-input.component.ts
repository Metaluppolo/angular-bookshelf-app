import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';


@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {
  @ViewChild('input') inputValue !: ElementRef<HTMLInputElement>
  @Input() options: string[] = [];
  @Output() sendValueEvent = new EventEmitter<string>();
  myControl = new FormControl<string>('');
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(option => {
        const value = option;
        return value ? this._filter(value as string) : this.options.slice();
      }),
    );
  }

  onClear() {
    this.inputValue.nativeElement.value = "";
    this._sendValue(this.inputValue.nativeElement.value);
  }

  onSearch() {
    this._sendValue(this.inputValue.nativeElement.value);
  }

  displayFn(option: string): string {
    return option && option ? option : '';
  }

  private _sendValue(value: string) {
    this.sendValueEvent.emit(value);
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
