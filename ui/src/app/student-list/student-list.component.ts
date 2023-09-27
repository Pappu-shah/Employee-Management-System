import { Component, OnInit } from '@angular/core';
import { Student } from '../Models/student.model';
import { StudentService } from '../Services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  constructor(private studentService: StudentService){}

  ngOnInit(): void {
    this.studentService.getAllStudents()
    .subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
