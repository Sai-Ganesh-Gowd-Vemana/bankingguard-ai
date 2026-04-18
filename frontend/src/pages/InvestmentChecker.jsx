import { useState } from "react";
import { checkInvestment } from "../services/api";

function InvestmentChecker(){

const [company,setCompany] = useState("");
const [result,setResult] = useState(null);

const handleCheck = async () => {

 const response = await checkInvestment(company);

 setResult(response);

}

return(

<div>

<h2>Investment Fraud Checker</h2>

<input
placeholder="Enter company name"
value={company}
onChange={(e)=>setCompany(e.target.value)}
/>

<br/><br/>

<button onClick={handleCheck}>
Check Company
</button>

<br/><br/>

{result && (

<div>

<h3>Status: {result.status}</h3>

</div>

)}

</div>

)

}

export default InvestmentChecker