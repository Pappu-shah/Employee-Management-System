import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/student.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http:HttpClient){}

  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.baseApiUrl + 'Student');
  }

  addStudent(addStudentRequest: Student): Observable<Student>{
    return this.http.post<Student>(this.baseApiUrl + 'Student', addStudentRequest);
  }

  getStudent(id: string): Observable<Student>{
    return this.http.get<Student>(this.baseApiUrl + 'Student/'+ id);
  }

  updateStudent(id: number, updateStudentRequest: Student): Observable<Student>{
    return this.http.put<Student>(this.baseApiUrl + 'Student/'+ id, updateStudentRequest);
  }

  deleteStudent(id: number): Observable<Student>{
    return this.http.delete<Student>(this.baseApiUrl + 'Student/'+ id);
  }
}
