<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <span class="navbar-title" style="color: white;">SAPIA</span>
        </a>
      </div>
  
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link balance-display">
              <span class="icon-text">
                <span class="icon">
                  <i class="fas fa-dollar-sign"></i>
                </span>
                <span class="balance-amount">R$ 1430,00</span>
              </span>
              <p class="subtitle is-6 balance-text" style="color: white;">Saldo na Carteira</p>
            </a>
  
            <div class="navbar-dropdown is-right">
              <div class="navbar-item">
                <input type="number" class="input" placeholder="Valor para Saque" v-model="withdrawAmount">
              </div>
              <div class="navbar-item">
                <button class="button is-success" @click="requestWithdrawal">Solicitar Saque</button>
              </div>
            </div>
          </div>
  
          <div class="navbar-item">
            <p class="doctor-name"><strong style="color: white;">Dr. João</strong></p>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        withdrawAmount: ''
      }
    },
    methods: {
      requestWithdrawal() {
        if (this.withdrawAmount) {
          alert(`Saque de R$ ${this.withdrawAmount} solicitado com sucesso!`);
          this.withdrawAmount = '';
        } else {
          alert('Por favor, insira um valor para saque.');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .navbar {
    background-color: #004d99;
    color: #ffffff;
    padding: 1rem;
    border-bottom: 4px solid #32cd32; 
  }
  
  .navbar-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .balance-display {
    display: flex;
    align-items: center;
    color: #ffffff;
  }
  
  .balance-amount {
    font-size: 1.25rem;
    font-weight: bold;
    color: #32cd32;
    margin-left: 0.5rem;
  }
  
  .balance-text {
    margin-left: 0.5rem;
  }
  
  .doctor-name {
    font-size: 1.25rem;
    font-weight: bold;
  }
  </style>
  