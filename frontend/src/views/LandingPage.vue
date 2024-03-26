<template>
  <Navbar></Navbar>

  <main>
    <div class="container-1">
      <div class="noImage">
        <h1 class="title">Unlock your potential. Step by Step</h1>
        <p class="text">
          Welcome to a journey of self-improvement. Our platform is designed to
          guide you through the process of personal growth, step by step.
          Whether you're looking to enhance your skills, build confidence, or
          achieve your goals, we're here to support you every step of the way.
        </p>
        <button class="button">Start</button>
      </div>
        <div>
            <img src="../assets/stairs.svg" alt="Stairs Image" class="image"/>
        </div>
    </div>
  </main>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>
<style>
.container-1{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #F6FFF8;
    height: 90vh;
}

.noImage{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.image{
    width: 500px;
    height: 500px;
}

.text{
    width: 70%;
}

.container-1 button{
    background-color: #ADDFAD;
    color: #2E4242;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 12px;
    border:2px solid #2E4242;
    font-size: 16pt;
    cursor: pointer;
    width: 100px;
}
</style>