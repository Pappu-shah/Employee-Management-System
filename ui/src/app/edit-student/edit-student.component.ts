import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../Services/student.service';
import { Student } from '../Models/student.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {
  studentDetails: Student = {
    id: 0,
    name: '',
    email: '',
    phone: 0,
    department: ''
  };

  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router){}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id) {
          this.studentService.getStudent(id)
          .subscribe({
            next: (response) => {
              this.studentDetails = response;
            }
          }); 
        }
      }
    })
  }

  updateStudent(){
    this.studentService.updateStudent(this.studentDetails.id, this.studentDetails)
    .subscribe({
      next: (response) => {
        this.router.navigate(['']);
      }
    });
  }

  deleteStudent(id: number){
    this.studentService.deleteStudent(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['students']);
      }
    });
  }

}
