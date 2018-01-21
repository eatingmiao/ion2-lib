import { Directive, Input, HostListener, Renderer } from '@angular/core';

@Directive({ 
  selector: '[menuBtn]'
})

export class MenuDirective {
  @Input('menuBtn') side: string;
  @Input() act: string;

  private left: any = document.getElementById('left');
  private content: any = document.getElementById('content');
  private right: any = document.getElementById('right');
  
  constructor(private renderer:Renderer) {
    
  }
  
  @HostListener('click') 
  @HostListener('toggle')
  onClick() {
    if (this.side == 'left') {
      this.toggleLeftMenu();
    } else if(this.side == 'right') {
      this.toggleRightMenu(this.act);
    }
  }
  
  private toggleLeftMenu() {
    if (this.content.className.indexOf('open-left-cont') === -1) {
      this.renderer.setElementClass(this.left, 'open-left', true);
      this.renderer.setElementClass(this.content, 'open-left-cont', true);
    } else {
      this.renderer.setElementClass(this.left, 'open-left', false);
      this.renderer.setElementClass(this.content, 'open-left-cont', false);
    }
	  this.toggleRightMenu('close');
  }

  private toggleRightMenu(act: string) {
    if (act == 'open') {
      this.renderer.setElementClass(this.right, 'open-right', true);
      this.renderer.setElementClass(this.content, 'open-left-cont', false);
      this.renderer.setElementClass(this.content, 'open-right-cont', true);
    } else if (act == 'close') {
      this.renderer.setElementClass(this.right, 'open-right', false);
      this.renderer.setElementClass(this.content, 'open-right-cont', false);
    }
  }
}
