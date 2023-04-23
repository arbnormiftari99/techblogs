<template>
    <div class="modal-container" :class="{ 'is-open': isOpen }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit('update:isOpen', false);
      },
    },
  };
  </script>
  
  <style>
  .modal-container {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.3s;
  }
  
  .modal-container.is-open {
    visibility: visible;
    opacity: 1;
  }
  
  .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .modal-content {
    position: relative;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
  }
  
  @media (min-width: 768px) {
    .modal-content {
      max-width: 60%;
      max-height: 70%;
    }
  }
  </style>
  