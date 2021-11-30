import { Component, OnInit } from '@angular/core';
import { ColumnChooserService, ContextMenuService, EditService, EditSettingsModel, ExcelExportService, PageService, PageSettingsModel, PdfExportService, ResizeService, SortService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { sampleData } from 'src/app/data/datasource';

@Component({
  selector: 'app-treegrid',
  templateUrl: './treegrid.component.html',
  styleUrls: ['./treegrid.component.css'],
  providers: [ PageService, ColumnChooserService, ToolbarService,SortService, ResizeService, EditService, ExcelExportService, PdfExportService, ContextMenuService  ]
})
export class TreegridComponent implements OnInit {

  public data: Object[] | undefined;
  public pageSettings: PageSettingsModel | undefined;
  public editing: EditSettingsModel | undefined;
  public toolbar: string[] | undefined;
  public editSettings!: Object;
  public contextMenuItems!: Object[];
  public editparams: Object | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.data = sampleData;
    this.editparams = {params: { format: 'n' }};
    this.editing = { allowDeleting: true, allowEditing: true, mode: 'Row' };
    this.toolbar = ['ColumnChooser'];
    this.editSettings = {allowEditing: true, allowAdding: true, allowDeleting: true, mode:"Row"};
    this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending','Edit','Delete', 'Save', 'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport','FirstPage', 'PrevPage', 'LastPage', 'NextPage'];
  }

}
