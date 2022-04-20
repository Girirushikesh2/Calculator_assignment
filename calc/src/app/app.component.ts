import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  input:string = '';
  result:string = '';
  
 
  pressNum(number: string) {
    console.log(number);
    //This will not allow more than one "."
    if (number==".") {
      if (this.input !="" ) {
 
        const lastNumber = this.getLastOperand() 
        console.log(lastNumber.lastIndexOf("."))  
        if (lastNumber.lastIndexOf(".") >= 0) return; //will not allow multiple "."
        
      }
    }
 
    //It will not allow 0 at beginning. 

    if (number=="0") {
      if (this.input=="") {
        return;
      }

      const PrevKey = this.input[this.input.length - 1];
      console.log(PrevKey);
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+')  {
        return;
      }
    }
 
    this.input = this.input + number
    this.finalAns();
  }
 
 
  getLastOperand() {      //whatever the last number containing "."(it will return the value before decmial)
    let posDotOp:number;   
    // console.log(this.input)
    posDotOp=this.input.toString().lastIndexOf("+")             //get the last occurance of the operator
    if (this.input.toString().lastIndexOf("-") > posDotOp) posDotOp=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > posDotOp) posDotOp=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > posDotOp) posDotOp=this.input.lastIndexOf("/")
    console.log(posDotOp);  //-1
    console.log('Last '+this.input.substr(posDotOp+1))
    return this.input.substr(posDotOp+1)
  }
 
 
  pressOperator(operator: string) {   //operator - it will only catch take operator +-*/
    // console.log(operator)
    //Do not allow operators more than once
    const lastElement = this.input[this.input.length - 1];
    console.log(lastElement)
    console.log(this.input.length)
    if (lastElement === '/' || lastElement === '*' || lastElement === '-' || lastElement === '+')  {
      return;
    }
   console.log(operator)
    this.input = this.input + operator         
    console.log(this.input)
    this.finalAns();
  }
 
   
  finalAns() {
    let formula = this.input;
 console.log(formula)
    let lastElement = formula[formula.length - 1];
 console.log(lastElement)
    //To remove any "." present at the end
    if (lastElement === '.')  {
      formula=formula.substr(0,formula.length - 1);
      console.log(formula)
    }
 
    lastElement = formula[formula.length - 1];            
    //To remove all the Operatiors present at the end
    if (lastElement === '/' || lastElement === '*' || lastElement === '-' || lastElement === '+' || lastElement === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    console.log("Formula " +formula);
    this.result = eval(formula);      //It will evaluate and the string and give us the answer 
  }
 // "=" to get the answer 
  getAnswer() {
    this.finalAns();
    this.input = this.result;
    if (this.input=="0") this.input="";
  }
  // To delete last number
  delete() {
    if ( this.input != "" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }
 // To clear all
  deleteAll() {
    this.result = '';
    this.input = '';
  }
}
