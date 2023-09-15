
<script>
  import { auth } from '$lib/firebase/firebase.js';
  import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
  import { Input, Label, Helper } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
  import { getDatabase, ref, set , push } from 'firebase/database'; // Import set function from Firebase Realtime Database

  let email = "";
  let password = "";
  let firstName = "";
  let lastName = "";
  let errorMessage = "";
  let showPassword = false; // Track whether to show the password

  

  async function handleSubmit() {
    try {
      // Check if the email is already in use
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        // Email is already in use
        errorMessage = "Email is already in use. Please use a different email.";
        return;
      }
      if (password.length < 6) {
        errorMessage = "Password must be at least 6 characters long.";
        return;
      }

      // If the email is not in use and password is valid, proceed with creating the account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the registered email and password for display
      const registeredEmail = user.email;
      const registeredPassword = password;

      const db = getDatabase(); // Initialize the database
const usersRef = ref(db, 'users'); // Reference to a "users" node in the database


      // Create a new user object with the registration data
      const newUser = {
  email: registeredEmail,
  password: registeredPassword,
  firstName,
  lastName,
};


      // Set the data in the database
      const newUserRef = push(usersRef, newUser);

      goto('/information', {
  state: {
    registeredEmail,
    registeredPassword,
  },
});

console.log("User signed up successfully!");
console.log("First Name:", firstName);
console.log("Last Name:", lastName);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  }

  const handleclick = () => {
    // Only allow clicking when there are no errors
    handleSubmit();
  }

  const togglePasswordVisibility = () => {
    // Toggle the password visibility
    showPassword = !showPassword;
  }



</script>


<h1  style="color: blue;" class="h1" >Sign Up</h1>
<p class="p1" >Please fill in this form to create an account.</p>

<form on:submit={handleSubmit}  class="container">
 <div class="mb-6">
   <Label for="firstname" class="form-label">Firstname:</Label>
   <Input type="text" bind:value={firstName} required id="email" placeholder="FirstName" class="form-input"  />
 </div>
 <div class="mb-6">
   <Label for="lastName" class="form-label">Lastname:</Label>
   <Input type="text" bind:value={lastName} required id="lastName" placeholder="LastName" class="form-input"  />
 </div>
 <div class="mb-6">
   <Label for="email" class="form-label">Email:</Label>
   <Input type="email" bind:value={email} required id="email" placeholder="Enter Email" class="form-input" />
 </div>
 {#if errorMessage}
 <p style="color: red;">{errorMessage}</p>
 {/if}

 <div class="mb-6">
   <div class="password-container">
     <Label for="password" class="form-label">Password:</Label>
     <Input
       type={showPassword ? "text" : "password"} 
       bind:value={password}
       required
       id="password"
       placeholder=" Password should be atleast 6 characters"
       class="form-input"
     />
     <label class="password-toggle">
       <input
         type="checkbox"
         checked={showPassword}
         on:change={togglePasswordVisibility}
       />
       Show Password
     </label>
   </div>
 </div>
 <div>
   <button  type="button" on:click={handleclick} >Signup</button>
 </div>

 <div class="mb-6" >
   <p>If already Register go back to Login page.</p>
   <a href="/" style="color: blue;  font-weight: bold; font-size:18px; ">Login</a>
  </div>
</form>


<style>
.container {
 padding: 16px;
 width: 500px;
 height: 500px;
 background-color: rgb(238, 240, 234);
 margin-left:500px;
 margin-top: 35px;

}
.h1{
   margin-left: 500px;
   margin-top: 35px;
   font-weight: bold;
   font-size:30px;
 }
 .p1{
   margin-left: 500px;
   font-weight:500;
  
   font-size:20px;
 }


 .mb-6 {

  border-radius: 1.25rem; 
 }

 
button {
 background-color: #04AA6D;
 color: white;
 padding: 14px 20px;
 margin: 8px 0;
 border: none;
 cursor: pointer;
 width: 100%;
}

button:hover {
 opacity: 0.8;
}
 
 </style>