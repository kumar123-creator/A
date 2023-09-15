
<script>
 
    import { auth } from '$lib/firebase/firebase.js';
   import { goto } from '$app/navigation';
  
   
 
   // Function to handle logout
   function handleLogout() {
     // Display a confirmation dialog
     const confirmLogout = window.confirm("Are you sure you want to logout?");
     
     if (confirmLogout) {
      
       auth.signOut().then(() => {
      
         console.log("User logged out");
         goto('/'); 
       }).catch((error) => {
       
         console.error("Logout error:", error);
       });
     }
   }
 
   function goToJobList() {
     goto('/joblist');
   }
   function goTocandidateList() {
     goto('/candidatelist');
   }
 
 
 </script>
 
 <h1 class="h1" style="color: darkgreen;">Congratulations! You successfully logged into your account.</h1>
 
 <button class="button top-right" type="button" on:click={handleLogout}>Logout</button>
 <button class="candidatelist-button" type="button" on:click={goTocandidateList}>Candidate List</button>
 <button class="joblist-button" type="button" on:click={goToJobList}>Job list</button>
 
 
 
<style>

  
    .h1 {
      margin-left: 10px;
      margin-top: 30px;
      font-weight: normal;
      font-size: 20px;
    }
    .button {
    background-color: #ed161a;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
  }

  .top-right {
    position: absolute;
    top: 10px; /* Adjust the top position as needed */
    right: 10px; /* Adjust the right position as needed */
  }
    .joblist-button {
      position: absolute;
      top: 100px;
      left: 200px;
      background-color: #007bff;
      color: white;
      padding: 10px 15px;
      border: none;
      cursor: pointer;
    }
    .candidatelist-button {
      position: absolute;
      top: 100px;
      left: 10px;
      background-color: #007bff;
      color: white;
      padding: 10px 15px;
      border: none;
      cursor: pointer;
    }
  </style>
 