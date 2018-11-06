import { Component, Inject, ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import * as Tesseract from '../../../../assets/Tesseract';

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.css']
})
export class AddExpenseDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) { }

    @ViewChild('inputFile')
  fileInput: ElementRef;
  fileReaded: any;
  fileName:String = 'no file chosen';
  scannedReceipt:any;
  fileIsLoading = false;
  addReceiptToggle:boolean = false;

    manualReceipt = { productName:'Audi A4',productPrice:'1200 PLM',location:'Krakow',type:'Car store'}
  
    getReceiptData(data:any){
      this.fileReaded = data.target.files[0];
      this.fileName = this.fileReaded.name;
      this.fileIsLoading = true;
      this.scannedReceipt = Tesseract.recognize(this.fileReaded, { lang: 'pol'}).then((res) =>{
        this.fileIsLoading = false;
        console.log(res);
        return res;
    });
  }

  resetFileInput(){
    this.fileInput.nativeElement.value = '';
    this.fileName = 'no file chosen';
    this.fileReaded = undefined;
    this.scannedReceipt = undefined;
  }

}
