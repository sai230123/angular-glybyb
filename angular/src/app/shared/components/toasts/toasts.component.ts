import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-toasts',
  template: `
  <ngb-toast
    *ngFor="let toast of toastService.toasts"
    [class]="classMap[toast.status] || 'bg-success text-light'"
    [autohide]="true"
    [delay]="toast.delay || 2000"
    (hidden)="toastService.remove(toast)"
  >
    <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
      <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
    </ng-template>

    <ng-template #text>{{ toast.textOrTpl }}</ng-template>
  </ngb-toast>
`,
host: {'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class ToastsComponent  {

  classMap: any ={
    'success': 'bg-success text-light',
    'error': 'bg-danger text-light',
  }
  getClassName(str:string) {
    
  }
  constructor(public toastService: ToastService) {}

	isTemplate(toast: any) {
		return toast.textOrTpl instanceof TemplateRef;
	}

}
