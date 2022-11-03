<h1>MobilePay Homework Assignement</h1>

<h2>Task Description</h2>

<p>Following business rules have been defined for first release of the application:

All merchants should be charged 1% of transaction amount
Telia merchant should get 10% discount
Circle_K merchant should get 20% discount
Transactions made during weekends are free of charge
When transaction number exceeds 10 for a merchant, he gets additional 20% discount for each next transaction
 
The tech lead has provided additional non-functional requirements for this application:

Ubiquitous language should be used in the solution ( https://www.agilealliance.org/glossary/ubiquitous-language )
Code should be flexible enough to change, add or remove rules.
To add new rule you shouldn't need to change existing code (except for facade class). (SOLID principle)
Precise naming is important
App should accept transactions as input below: 
        2018-09-01 7-ELEVEN 50                                                                                    
        2018-09-04 CIRCLE_K 30                                                                                    

Fees should be formatted as output below:
        2018-09-01 7-ELEVEN 0.00
        2018-09-04 CIRCLE_K 0.80</p>
        
<h2>Installing</h2>
        
<p>Program is written in TypeScript, testing prepared with Jest. Install needed modules with <strong>npm install</strong> in node.js environment.</p>
        
<h2>Executing</h2>
        
<p>Open index.html file and check Console in browser Dev tools for sample data output. Run tests with  <strong>npm test</strong> in node.js environment <p>
        
        
