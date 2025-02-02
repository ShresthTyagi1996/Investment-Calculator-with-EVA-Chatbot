import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import type { InvestmentInput } from './investment-input.model';
import { EVAComponent } from './eva/eva.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, UserInputComponent, EVAComponent]
})
export class AppComponent {

  onClickCalculate = false;
  onChatBotClick = true;

  resultsData ?: {
    year: number;
    interest: number;
    valueEndOfYear: number;
    annualInvestment: number;
    totalInterest: number;
    totalAmountInvested: number;
  }[];

  onCloseChatBot() {
    this.onChatBotClick = false;
  }

  onCalculateInvestmentResults(data: InvestmentInput) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } = data;
    const annualData = [];
  let investmentValue = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const year = i + 1;
    const interestEarnedInYear = Math.floor(investmentValue * (expectedReturn / 100));
    investmentValue += interestEarnedInYear + annualInvestment;
    investmentValue = Math.floor(investmentValue);
    const totalInterest =
      Math.floor(investmentValue - annualInvestment * year - initialInvestment);
    annualData.push({
      year: year,
      interest: interestEarnedInYear,
      valueEndOfYear: investmentValue,
      annualInvestment: annualInvestment,
      totalInterest: totalInterest,
      totalAmountInvested: initialInvestment + annualInvestment * year,
    });
  }

  this.resultsData = annualData;
  this.onClickCalculate = true;
  }

  
}
