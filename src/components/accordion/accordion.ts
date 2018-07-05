import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Renderer,
  OnInit
} from "@angular/core";

@Component({
  selector: "accordion",
  templateUrl: './accordion.html',  
})
export class AccordionComponent implements OnInit {
  @ViewChild("content", { read: ElementRef }) Content;
  @Input("title") title: string;
  icon: string = "ios-arrow-forward";
  accordionExapanded = false;
  
  constructor(public renderer: Renderer) { }

  ngOnInit() {
    this.renderer.setElementStyle(
      this.Content.nativeElement,
      "webkitTransition",
      "max-height 500ms, padding 500ms"
    );
  }

  toggleAccordion() {
    if (this.accordionExapanded) {
      this.renderer.setElementStyle(
        this.Content.nativeElement,
        "max-height",
        "0px"
      );
      this.renderer.setElementStyle(
        this.Content.nativeElement,
        "padding",
        "0px 16px"
      );
    } else {
      this.renderer.setElementStyle(
        this.Content.nativeElement,
        "max-height",
        "500px"
      );
      this.renderer.setElementStyle(
        this.Content.nativeElement,
        "padding",
        "13px 16px"
      );
    }
    this.accordionExapanded = !this.accordionExapanded;
    this.icon =
      this.icon == "ios-arrow-forward" ? "ios-arrow-down" : "ios-arrow-forward";
  }
}
