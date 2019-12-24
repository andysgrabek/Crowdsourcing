import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ResearchConfig} from '../dto/ResearchConfig';
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog, MatSnackBar, MatTable} from '@angular/material';
import {ResearchConfigService} from '../service/research-config.service';
import ResearchSurvey from '../dto/ResearchSurvey';

@Component({
  selector: 'app-research-config-list',
  templateUrl: './research-config-list.component.html',
  styleUrls: ['./research-config-list.component.css', '../app.component.css']
})
export class ResearchConfigListComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) researchTable: MatTable<any>;
  public model: [string, ResearchConfig][];
  public displayedColumns: string[] = ['id', 'action'];

  constructor(private dialog: MatDialog,
              private snackBack: MatSnackBar,
              private router: Router,
              public researchConfigService: ResearchConfigService) {

  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.researchConfigService.getAll().subscribe(res => {
      this.model = new Array(...res.entries());
    });
  }

  async onEdit(id: string) {
    await this.router.navigateByUrl('research-config/' + id);
  }

  async onDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.text = 'Are you sure?';
    dialogRef.componentInstance.onConfirm = () => {
      dialogRef.close();
      if (this.researchConfigService.deleteResearch(id)) {
        this.snackBack.open('Successfully removed research');
        this.researchTable.renderRows();
      } else {
        this.snackBack.open('Failed to remove research');
      }
    };
    dialogRef.componentInstance.onCancel = () => {
      dialogRef.close();
    };
  }

  async onAddNew() {
    const newResearch = new ResearchConfig();
    try {
      await this.researchConfigService.createResearch(newResearch);
      this.loadData();
    } finally {

    }
  }

}
