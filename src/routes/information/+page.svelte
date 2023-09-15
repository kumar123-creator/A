<script>
  import { onMount } from 'svelte';

  let isBlue = true; // Start with blue color

  onMount(() => {
    // Create an interval to toggle the color every 2 seconds
    const interval = setInterval(() => {
      isBlue = !isBlue;
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  });
</script>


<h1 class="h1" style="color: darkgreen;" >Congratulations! you successfully sign in into Your account.Please goto Login page.</h1>
<a href="/" style="color: blue;  font-weight: bold; font-size:18px; " class="h2">Login</a>

<style>
  .h2 {
    margin-left: 10px;
    margin-top: 185px;
    font-weight: bold;
    font-size: 70px;
  }

  .h1{
    margin-left: 10px;
    margin-top: 195px;
    font-weight:normal;
    font-size: 20px;
  }

</style>
