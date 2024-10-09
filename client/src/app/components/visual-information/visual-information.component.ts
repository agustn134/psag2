import { Component, OnInit } from '@angular/core';
import { YtService } from '../../services/yt.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-visual-information',
  templateUrl: './visual-information.component.html',
  styleUrl: './visual-information.component.css'
})
export class VisualInformationComponent {
  videos: any[] | undefined;
  videoUrl: SafeResourceUrl;
  searchTerm: string = '';


  constructor(private ytService: YtService, private sanitizer: DomSanitizer) {
    this.videoUrl = '';
  }

  ngOnInit(): void {
    this.searchVideos();
    const body = document.querySelector('body');
  }


  getVideoUrl(videoId: string): SafeResourceUrl {
    if (videoId) {
      const protocol: string = 'https';
      const url = protocol +'://www.youtube.com/embed/' + videoId;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return '';
  }

  searchVideos() {
      this.ytService.getVideos(this.searchTerm)
      .subscribe((data: any) => {
        this.videos = data.items;
      });
  }
}
