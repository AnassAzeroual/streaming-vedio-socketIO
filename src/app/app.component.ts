import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('videoElement', { static: false }) videoElementTarget;
  
  title = 'streaming-vedio';
  video: any;

  isPlaying = false;

  displayControls = true;

  ngOnInit() {
    
    
  }

  ngAfterViewInit(): void {
    this.video = this.videoElementTarget.nativeElement;
    console.log(this.videoElementTarget);
    
  }

  start() {
    this.initCamera({ video: true, audio: false });
  }

  pause() {
    this.video.pause();
  }

  toggleControls() {
    this.video.controls = this.displayControls;
    this.displayControls = !this.displayControls;
  }

  resume() {
    this.video.play();
  }

  sound() {
    this.initCamera({ video: true, audio: true });
  }

  initCamera(config:any) {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      console.log(stream);
      this.video.srcObject = stream
      // this.video.srcObject = stream
      this.video.play();
    });
  }
}
