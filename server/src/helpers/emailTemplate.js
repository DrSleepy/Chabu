export const renderEmailTemplate = ({ username, tokenLink }) => `
<html>
<head>
<style>
body {
  color: black;
}

p {
  line-height: 1.5;
}

a {
  text-decoration: none;
  color: white;
}

.container {
  font-family: 'Helvetica Neue', Helvetica;
  text-align: center;
  padding: 5px; 
}

.text-container {
  width: 90%;
  max-width: 800px;
  font-weight: 300;
  margin: 0 auto;
  padding: 15px;
  padding-bottom: 15px;
}

.button {
  padding: 15px;
  text-size: 18px;
  color: white;
  background-color: #0379FF;
  border: 0;
  border-radius: 5px;
  margin: 10px;
  display: block;
  max-width: 200px;
  margin: auto;
  text-decoration: none;
}

</style>
</head>
<body>
  <div class="container" id="mobile">
    <div class= "text-container">
      <h1> Email verification</h1>
      <p>Hi ${username}, </p>
      <p>In order to link your Askit account to your email, please confirm your email by clicking the button below.</p>
      <a href="${tokenLink}" target="_blank" class= "button"> Verify email </a>
    </div>
  </div>
</body>
</html>

`;
