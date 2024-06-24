<template>
    <div>
      <button class="menu-button" @click="toggleSidebar">
        <i class="fas fa-bars"></i>
      </button>
      <div :class="['sidebar', { 'is-active': sidebarActive }]">
        <div class="sidebar-header">
          <h1 class="sidebar-title">SAPIA</h1>
        </div>
        <div class="sidebar-content">
          <div class="balance-display">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-dollar-sign"></i>
              </span>
              <span class="balance-amount">R$ {{ internalBalance.toFixed(2) }}</span>
            </span>
            <p class="balance-text">Saldo na Carteira</p>
          </div>
          <div class="sidebar-item">
            <p class="doctor-name"><strong>{{ doctorName }}</strong></p>
          </div>
          <div class="sidebar-item">
            <router-link to="/minhas-consultas" class="button is-primary is-fullwidth">Minhas Consultas</router-link>
          </div>
          <div class="sidebar-item">
            <router-link to="/dashboard" class="button is-success is-fullwidth">Consultas Disponíveis</router-link>
          </div>
          <div class="sidebar-item">
            <button class="button is-danger is-fullwidth" @click="logout">Logout</button>
          </div>
          <div class="sidebar-item">
            <button class="button is-warning is-fullwidth" @click="toggleWithdraw">Sacar</button>
            <div v-if="showWithdraw">
              <div class="field">
                <label class="label" for="withdrawAmount">Valor do Saque</label>
                <div class="control has-icons-right">
                  <input v-model.number="withdrawAmount" id="withdrawAmount" class="input" type="number" min="0" :max="internalBalance" />
                  <span class="icon is-small is-right">
                    <i class="fas fa-dollar-sign"></i>
                  </span>
                </div>
              </div>
              <button class="button is-warning" @click="withdraw">Confirmar Saque</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarSapia',
    props: {
      totalBalance: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        doctorName: localStorage.getItem('user_name') || 'Dr. Nome',
        withdrawAmount: 0,
        internalBalance: this.totalBalance,
        showWithdraw: false,
        sidebarActive: false
      };
    },
    methods: {
      logout() {
        localStorage.removeItem('user_name');
        localStorage.removeItem('associated_consultas');
        this.$router.push('/login');
      },
      toggleWithdraw() {
        this.showWithdraw = !this.showWithdraw;
      },
      withdraw() {
        if (this.withdrawAmount <= this.internalBalance) {
          alert(`Saque de R$ ${this.withdrawAmount.toFixed(2)} solicitado, a DocSolution fará a transferencia na conta cadastrada.`);
          this.withdrawAmount = 0;
          this.showWithdraw = false;
        } else {
          alert('Saldo insuficiente para realizar o saque.');
        }
      },
      toggleSidebar() {
        this.sidebarActive = !this.sidebarActive;
      }
    },
    watch: {
      totalBalance(newBalance) {
        this.internalBalance = newBalance;
      }
    }
  };
  </script>
  
  <style scoped>
  .menu-button {
    position: absolute;
    top: 0.6rem;
    left: 1rem;
    background: none;
    border: none;
    color: #32cd32;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1000;
    padding-bottom: 10px;
  }
  
  .sidebar {
    width: 250px;
    background-color: #004d99;
    color: #ffffff;
    height: 100vh;
    position: fixed;
    top: 0;
    left: -250px; 
    transition: left 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 1rem;
    z-index: 999;
  }
  
  .sidebar.is-active {
    left: 0;
  }
  
  .sidebar-header {
    padding: 1rem;
    border-bottom: 4px solid #32cd32;
  }
  
  .sidebar-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
  
  .sidebar-content {
    padding: 1rem;
  }
  
  .balance-display {
    margin-top: 1rem;
  }
  
  .icon-text {
    display: flex;
    align-items: center;
  }
  
  .icon {
    margin-right: 5px;
  }
  
  .balance-amount {
    font-size: 1.25rem;
    font-weight: bold;
    color: #32cd32;
  }
  
  .balance-text {
    margin: 0;
  }
  
  .doctor-name {
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 2rem;
  }
  
  .button.is-primary {
    background-color: #32cd32;
    border-color: #32cd32;
    color: white;
    width: 100%;
    border-radius: 8px;
    margin-top: 1rem;
  }
  
  .button.is-primary:hover {
    background-color: #28a745;
    border-color: #28a745;
  }
  
  .button.is-success {
    background-color: #17a2b8;
    border-color: #17a2b8;
    color: white;
    width: 100%;
    border-radius: 8px;
    margin-top: 1rem;
  }
  
  .button.is-success:hover {
    background-color: #138496;
    border-color: #138496;
  }
  
  .button.is-danger {
    background-color: #ff3860;
    border-color: #ff3860;
    color: white;
    width: 100%;
    border-radius: 8px;
    margin-top: 1rem;
  }
  
  .button.is-danger:hover {
    background-color: #ff1e45;
    border-color: #ff1e45;
  }
  
  .button.is-warning {
    background-color: #ffc107;
    border-color: #ffc107;
    color: white;
    width: 100%;
    border-radius: 8px;
    margin-top: 1rem;
  }
  
  .button.is-warning:hover {
    background-color: #e0a800;
    border-color: #e0a800;
  }
  
  .field {
    margin-top: 1rem;
  }
  
  .input {
    border-radius: 4px;
  }
  
  .control.has-icons-right .input {
    padding-right: 2.5em;
  }
  
  .icon.is-right {
    right: 10px;
  }
  </style>
  
