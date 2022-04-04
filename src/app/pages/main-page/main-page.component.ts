import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MainPageDTO} from "../../@core/dtos/MainPageDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainPageService} from "../../@core/services/main-page.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  form!: FormGroup;
  editing: boolean = false;
  mainPage: MainPageDTO = new MainPageDTO();

  @ViewChild("greetingRef") greetingRef!: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private mainPageService: MainPageService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(data?: MainPageDTO): void {
    this.form = this.formBuilder.group({
      name: [[data && data.name ? data.name : ''], [Validators.required, Validators.maxLength(20)]],
      surname: [[data && data.surname ? data.surname : ''], [Validators.required, Validators.minLength(5)]],
      age: [[data && data.age ? data.age : 18], [Validators.required]],
      birthDate: [[data && data.birthDate ? data.birthDate : new Date()], [Validators.required]],
      deathDate: [[data && data.deathDate ? data.deathDate : new Date()], [Validators.required]],
    })
  }

  mockMethod(): void {
    this.form?.get('name')
  }

  toggleEditing(event: any): boolean {
    this.editing = event.checked;
    return this.editing;
  }

  save(): void{
    this.editing = false;
    this.mainPage.name = this.form.get('name')?.value;
    this.mainPage.surname = this.form.get('surname')?.value;
    this.mainPage.age = this.form.get('age')?.value;
    this.mainPage.birthDate = this.form.get('birthDate')?.value;
    this.mainPage.deathDate = this.form.get('deathDate')?.value;
    //
    // this.mainPageService.save(this.mainPage).subscribe(data => {
    //   console.log(data);
    // });

  }

  cancel(): void{
    this.editing = false;
    this.form.get('name')?.setValue(this.mainPage.name);
    this.form.get('surname')?.setValue(this.mainPage.surname);
    this.form.get('age')?.setValue(this.mainPage.age);
    this.form.get('birthDate')?.setValue(this.mainPage.birthDate);
    this.form.get('deathDate')?.setValue(this.mainPage.deathDate);
  }

  getError(controlName: string): string{
    if (controlName === 'name'){
      return 'Please insert valid name with max length 20';
    } else if (controlName === 'surname') {
      return 'Please insert valid surname';
    } else if (controlName === 'age'){
      if (this.form.get('age')?.value > 65) {
        return 'Please insert smaller age';
      } else if (this.form.get('age')?.value < 65) {
        return 'Please insert greater age';
      }
    }
    return 'Please insert valid field';
  }

  openGreeting(): void{
    // let dialogRef = this.dialog.open(this.greetingRef);
  }
}

