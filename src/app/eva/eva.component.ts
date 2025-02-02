import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GeminiService } from './gemini.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eva',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './eva.component.html',
  styleUrl: './eva.component.css'
})
export class EVAComponent {

  @Input({ required: true }) closeButton = false;
  @Output() close = new EventEmitter<void>();
  isClicked = false;

  prompt = "";
  loading = false;
  responses: {
    id: number;
    prompt: string;
    response: string;
  }[] = [];


  constructor(public geminiService: GeminiService) { } //see why this code is not working

  ngOnInit() {
    const data = localStorage.getItem('chatData');
    if (data) {
      this.responses = JSON.parse(data);
    }
  }

  fetchChatResponse() {
    this.loading = true;
    this.geminiService.fetchChatResponse(this.prompt).subscribe((response: any) => {
      this.responses.push({ id: (this.responses.length + 1) ,prompt: this.prompt, response: response.response });
      this.loading = false;
      this.prompt = "";
      localStorage.setItem('chatData', JSON.stringify(this.responses));
    });
  }

  // async fetchChatResponse() {
  //   this.loading = true;
  //   try {
  //     const result = await this.geminiService.fetchChatResponse(this.prompt);
  //     const newResponse = [...this.responses, { prompt: this.prompt, response: result.response.text(), id: this.responses.length + 1 }];
  //     this.responses = newResponse;
  //     this.prompt = '';
  //     localStorage.setItem('chatbotResponse', JSON.stringify(newResponse));
  //   } catch (error) {
  //     console.error('Error fetching response', error);
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  onClick() {
    this.isClicked = true;
  }

  closechat() {
    this.isClicked = false;
    this.close.emit();
  }
}
