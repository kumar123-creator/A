<script>
    import { Card } from 'flowbite-svelte';
    import { auth } from '$lib/firebase/firebase.js';
  import { goto } from '$app/navigation';

    
  // Function to handle logout
  function handleLogout() {
    // Display a confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
      // User confirmed, proceed with logout
      // You can use your Firebase auth instance to sign the user out
      // For example:
      auth.signOut().then(() => {
        // Handle successful logout, e.g., navigate to the /information page
        console.log("User logged out");
        goto('/'); // Navigate to the /information route
      }).catch((error) => {
        // Handle logout error, if any
        console.error("Logout error:", error);
      });
    }
  }

  function candidatelist() {
    goto('/candidatelist');
  }
  function joblist() {
    goto('/joblist');
  }
 
 
  </script>
  

  <main>
  <div class="card-container">
    <div class="grid grid-cols-3 gap-4">
      <Card class="small-card" style="width: 350px ;  "  >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"  >Revenue</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">£6,283,954.</p>
      </Card>
      <Card class="small-card" style="width: 350px ;background-color:green  "  >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: white ; " >Productivity</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color: white ; ">£2,094,651.</p>
      </Card>
      <Card class="small-card" style="width: 350px ; " >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: blue ; ">Jobs On</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">54</p>
      </Card>
      <Card class="small-card" style="width: 350px ; " >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: green ; ">Placements</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">49</p>
      </Card>
      <Card class="small-card" style="width: 350px ; " >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: red; ">Invoice Not Sent</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">£301,192</p>
      </Card>
      <Card class="small-card" style="width: 350px ; background-color:Violet" >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: white ; ">Andy. Barnes</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">£6,202,725</p>
      </Card>
      <Card class="small-card" style="width: 350px ;  "  >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" >Invoiced</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" >£194,735</p>
      </Card>
      <Card class="small-card" style="width: 350px ; " >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: green ; ">Interviews  </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">0</p>
      </Card>
      <Card class="small-card" style="width: 350px ;" >
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" style="color: blue ; ">CV Shares  </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight" style="color:blue ; ">132</p>
      </Card>
    </div>
  </div>
  
  <button class="button top-right" type="button" on:click={handleLogout}>Logout</button>
<button class="candidatelist-button" type="button" on:click={candidatelist}>Candidate List</button>
<button class="joblist-button" type="button" on:click={joblist}>Job List</button>
</main>


  <style>
  .card-container {
    margin-left: 250px;
    margin-top: 200px;
   
  }
  
  .small-card {
    width: 10px; 
    height: 150px; 
    padding: 1rem; 
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
     .candidatelist-button {
       background-color:blue;
       color: white;
       padding: 10px 15px;
       border: none;
       cursor: pointer;
       position: absolute;
       top: 300px; /* Adjust the top position as needed */
       left: 10px;
     }
     .joblist-button {
       background-color:blue;
       color: white;
       padding: 10px 15px;
       border: none;
       cursor: pointer;
       position: absolute;
       top: 350px; /* Adjust the top position as needed */
       left: 10px;
       width:130px;
       height:40px
     }
 
  </style>
  