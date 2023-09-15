
<script>
    import { onMount } from "svelte";
    import { auth } from '$lib/firebase/firebase.js';
   import { goto } from '$app/navigation';
  
  
   
   let jsonData = [];
   let gridData = [];
   
   onMount(async () => {
     const response = await fetch(
       "https://api.recruitly.io/api/job?apiKey=TEST64518616D4CF145D4E20BD47169EA7229BA3"
     );
     const responseData = await response.json();
     jsonData = responseData.data;
     console.log(jsonData);
   
     gridData = jsonData.map((item) => ({
       id: item.id,
       reference: item.reference,
       title: item.title,
     status: item.status,
       jobType: item.jobType,
     }));
   
     const dataGrid = new DevExpress.ui.dxDataGrid(document.getElementById("dataGrid"), {
       dataSource: gridData,
       columns: [
         { dataField: "id", caption: "ID", width: 250 },
         { dataField: "reference", caption: "Reference", width: 200 },
         { dataField: "title", caption: "Title", width: 200 },
         { dataField: "status", caption: "Status", width: 200 },
         { dataField: "jobType", caption: "JobType", width: 150 },
         // Define other columns as needed
       ],
       showBorders: true,
       filterRow: {
         visible: true,
       },
       editing: {
         allowDeleting: true,
         allowAdding: true,
         allowUpdating: true,
         mode: "popup",
         form: {
           labelLocation: "top",
         },
         popup: {
           showTitle: true,
           
         },
         texts: {
           saveRowChanges: "Save",
           cancelRowChanges: "Cancel",
           deleteRow: "Delete",
           confirmDeleteMessage: "Are you sure you want to delete this record?",
         },
       },
       paging: {
         pageSize: 10,
       },
       onRowInserting: async (e) => {
         console.log("Data being sent to API:", e.data);
         try {
           const response = await fetch(
             "https://api.recruitly.io/api/job?apiKey=TEST64518616D4CF145D4E20BD47169EA7229BA3",
             {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify(e.data),
             }
           );
   
           const responseData = await response.json();
           if (response.ok) {
             e.data.reference = responseData.reference;
             gridData.push(e.data);
             dataGrid.refresh();
           } else {
             console.error("Failed to add record:", responseData.error);
           }
         } catch (error) {
           console.error("Failed to add record:", error);
         }
       },
       onRowUpdating: async (e) => {
         try {
           console.log(e);
           var newData = {
             id: e.key.id,
             reference: e.newData.reference === undefined ? e.oldData.reference : e.newData.reference,
             title: e.newData.title === undefined ? e.oldData.title : e.newData.title,
           status: e.newData.status === undefined ? e.oldData.status : e.newData.status,
             jobType: e.newData.jobType === undefined ? e.oldData.jobType : e.newData.jobType,
           }
   
           console.log(newData)
           const response = await fetch(
             `https://api.recruitly.io/api/job?apiKey=TEST64518616D4CF145D4E20BD47169EA7229BA3`,
             {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify(newData),
             }
           );
           const responseData = await response.json();
           if (response.ok) {
             const updatedItemIndex = gridData.findIndex((item) => item.id === e.key);
             gridData.push(e.newData);
             gridData[updatedItemIndex] = e.newData;
             dataGrid.refresh();
           } else {
             console.error("Failed to update record:", responseData.error);
           }
         } catch (error) {
           console.error("Failed to update record:", error);
         }
       },
       onRowRemoving: async (e) => {
         console.log("Data being sent to API:", e.data);
         try {
           const response = await fetch(
             `https://api.recruitly.io/api/job/${e.data.id}?apiKey=TEST64518616D4CF145D4E20BD47169EA7229BA3`,
             {
               method: "DELETE",
             }
           );
           if (response.ok) {
             const removedItemIndex = gridData.findIndex((item) => item.id === e.key);
             if (removedItemIndex > -1) {
               gridData.splice(removedItemIndex, 1);
               dataGrid.refresh();
             }
           } else {
             console.error("Failed to delete record.");
           }
         } catch (error) {
           console.error("Failed to delete record:", error);
         }
       },
       onInitialized: () => {
   
       },
     });
   });
  
   
  
 
   let isBlue = true; 
 
   onMount(() => {
     // Create an interval to toggle the color every 2 seconds
     const interval = setInterval(() => {
       isBlue = !isBlue;
     }, 1000);
 
     // Clean up the interval when the component is unmounted
     return () => clearInterval(interval);
   });
 
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
 
   function back() {
     goto('/sucesspage');
   }
   function home() {
     goto('/');
   }
 
 
 </script>
 
 <h1 class="h1">Congratulations! You successfully logged into your account.</h1>
 <main>
    <h2 class="h2" style="color: blue;">Jobs list</h2>
   <div class="datagrid" id="dataGrid"></div>
 </main>
 <button class="button top-right" type="button" on:click={handleLogout}>Logout</button>
 
 <button class="back-button" type="button" on:click={back}>back</button>
 

 
 <style>
 
   .datagrid{
     margin-top:10px ;
     background-color: rgb(185, 127, 255);
   }
 
   .h1 {
     margin-left: 10px;
     margin-top: 30px;
     font-weight: normal;
     font-size: 20px;
   }
   .h2 {
    margin-left: 10px;
    margin-top: 10px;
    font-weight: bold;
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
  .back-button {
    margin-left: 10px;
    margin-top:1px;
    background-color: #324ff5;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
  }

 </style>