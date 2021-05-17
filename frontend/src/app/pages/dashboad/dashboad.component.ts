import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.scss']
})
export class DashboadComponent implements OnInit {

  data: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkAuthentication().subscribe((res: HttpResponse<any>) => {
      console.log(res.body);
      this.data = res.body;
    })
  }

}
