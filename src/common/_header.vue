<template>
    <header>
      <span class="icon-go"></span>
      <slot name="title"></slot>
    </header>
</template>

<script>
import '../assets/css/style.css';
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
 header{
   position: relative;
   height:0.88rem;
   line-height: 0.88rem;
   background: url("../assets/image/m-maya-top.jpg") 0 0 repeat-y; background-size: 100% 100%;
   text-align: center;
   padding: 0 0.2rem;
   margin-bottom: 0.4rem;
 }
 header h1{
  font-size:0.36rem;color: #fff;
   display: block;
   width: 100%;
   font-weight: 400;
   text-align: center;
 }
 header span,header a {
   position: absolute;
   left: 0.3rem;
   top: 50%;
   transform:translateY(-50%) rotate(-180deg);
   font-size: 0.46rem;
 }
 .icon-go:before{
   color:#fff;
 }
</style>
