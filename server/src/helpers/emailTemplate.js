export const renderEmailTemplate = ({ username, tokenLink, company }) => `
<div style="width:90%;max-width:800px;font-weight:300;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;color:black;font-family:'Helvetica Neue', Helvetica;" >

  <h1> Email verification </h1>

  <p style="line-height:1.5;" > Hi ${username}, </p>

  <p style="line-height:1.5;margin-bottom:30px" > Your are recieving this email because an email confirmation request was sent from ${company}. </br>
  In order to link your ${company} account to your email, please confirm your email by clicking the button below. </p>
  
  <a href="${tokenLink}" target="_blank" style="text-align:center;padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;text-size:18px;color:white;background-color:#0379FF;border-width:0;border-radius:5px;margin-top:auto;margin-bottom:auto;margin-right:auto;margin-left:auto;display:block;max-width:200px;text-decoration:none;" > Verify email </a>

</div>
`;
