import { Component } from '@angular/core';
import { StudentService } from '../Services/student.service';
import { Router } from '@angular/router';
import { Student } from '../Models/student.model';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  public addStudentRequest: Student = {
    id: 0,
    name: '',
    email: '',
    phone: 0,
    department: ''
  };

  constructor(private studentService: StudentService, private router: Router){}

  addStudent() {
    this.studentService.addStudent(this.addStudentRequest)
    .subscribe({
      next: (students) => {
        this.router.navigate(['']);
      }
    });
  }
}
