import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private apiURL = 'https://api.gemini.com/v1/';
  private apiKey = environment.geminiApiKey;


  constructor(private httpClient: HttpClient) {}

  fetchChatResponse(prompt: string): Observable<any> {
  const genAI = new GoogleGenerativeAI(this.apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const headers = new HttpHeaders({ 'X-GEMINI-APIKEY': this.apiKey });
    return this.httpClient.post(`${this.apiURL}chat`, { prompt }, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  } //see why this code is not working

  async fetchChatResponseUsingAsync(prompt: string): Promise<any> {
    const headers = new HttpHeaders({
      'X-GEMINI-APIKEY': this.apiKey
    });
    const response = await this.httpClient.post<any>(`${this.apiURL}/generate-content`, { prompt }, { headers }).toPromise();
    return response;
  }

  async fetchChatResponseFromGemini() {
    
//     // create an instance of the GoogleGenerativeAI
//     const genAI = new GoogleGenerativeAI(this.apiKey);
//     // we have selected the model "gemini-1.5-flash"
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // we have given the prompt to the model and it will generate the response
//     const result = await model.generateContent(prompt);
//     // we will get the response from the model
//     // console.log(result.response.text());
//     // ... spread operator is used to copy the previous response and add the new response
//     const newResponse = [
//       ...response,
//       { prompt: prompt, response: result.response.text() },
//     ]
//     setResponse(newResponse);
//     setPrompt("");
//     setLoading(false);
//     // save the response in the local storage
//     localStorage.setItem('chatbotResponse', JSON.stringify(newResponse));
  }
}
