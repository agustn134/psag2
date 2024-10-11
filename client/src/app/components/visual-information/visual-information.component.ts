// import { Component, OnInit } from '@angular/core';
// import { YtService } from '../../services/yt.service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'app-visual-information',
//   templateUrl: './visual-information.component.html',
//   styleUrl: './visual-information.component.css'
// })
// export class VisualInformationComponent {
//   videos: any[] | undefined;
//   videoUrl: SafeResourceUrl;
//   searchTerm: string = '';


//   constructor(private ytService: YtService, private sanitizer: DomSanitizer) {
//     this.videoUrl = '';
//   }

//   ngOnInit(): void {
//     this.searchVideos();
//     const body = document.querySelector('body');
//   }


//   getVideoUrl(videoId: string): SafeResourceUrl {
//     if (videoId) {
//       const protocol: string = 'https';
//       const url = protocol +'://www.youtube.com/embed/' + videoId;
//       return this.sanitizer.bypassSecurityTrustResourceUrl(url);
//     }
//     return '';
//   }

//   // Método que cambia el src del video principal
//   playVideo(videoId: string): void {
//     const mainVideo = document.getElementById('mainVideo') as HTMLVideoElement;
//     if (mainVideo) {
//       mainVideo.src = `https://www.youtube.com/embed/${videoId}`;
//       mainVideo.load(); // Cargar el nuevo video
//       mainVideo.play(); // Reproducir el nuevo video
//     }
//   }

//   searchVideos() {
//       this.ytService.getVideos(this.searchTerm)
//       .subscribe((data: any) => {
//         this.videos = data.items;
//       });
//   }
// }




import { Component, OnInit } from '@angular/core';
import { YtService } from '../../services/yt.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-visual-information',
  templateUrl: './visual-information.component.html',
  styleUrls: ['./visual-information.component.css']
})
export class VisualInformationComponent implements OnInit {
  videos: any[] = [];
  videoUrl: SafeResourceUrl = '';
  searchTerm: string = '';

  constructor(private ytService: YtService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.searchVideos();
  }

  getVideoUrl(videoId: string): SafeResourceUrl {
    if (videoId) {
      const protocol: string = 'https';
      const url = `${protocol}://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return '';
  }

  // Método para cambiar el src del video principal
  playVideo(videoId: string): void {
    const mainVideo = document.getElementById('mainVideo') as HTMLIFrameElement;
    if (mainVideo) {
      mainVideo.src = `https://www.youtube.com/embed/${videoId}`;
    }
  }

  searchVideos(): void {
    this.ytService.getVideos(this.searchTerm)
      .subscribe((data: any) => {
        this.videos = data.items;
      });
  }
}
