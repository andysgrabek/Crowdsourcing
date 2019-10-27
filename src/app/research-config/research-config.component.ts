import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-research-config',
  templateUrl: './research-config.component.html',
  styleUrls: ['./research-config.component.css']
})
export class ResearchConfigComponent implements OnInit {

  id: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
