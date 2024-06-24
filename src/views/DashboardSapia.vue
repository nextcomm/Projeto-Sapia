<template>
    <div class="dashboard-container">
      <SidebarSapia :totalBalance="totalBalance" />
      <section class="section dashboard-section">
        <div class="container mt-5">
          <h1 class="title">Consultas Disponíveis</h1>
          <div class="columns is-multiline">
            <div class="column is-one-third" v-for="consulta in consultas" :key="consulta.consulta_id">
              <ConsultaCard 
                :doctor="consulta.nome_paciente" 
                :details="consulta.status_agenda" 
                :price="consulta.valor_pagamento"
                :consultaId="consulta.consulta_id"
                @consultaAssociada="updateBalance"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import SidebarSapia from '@/components/SidebarSapia.vue';
  import ConsultaCard from '@/components/ConsultaCard.vue';
  
  export default {
    components: {
      SidebarSapia,
      ConsultaCard
    },
    data() {
      return {
        consultas: [],
        totalBalance: 0
      }
    },
    mounted() {
      this.fetchConsultas();
      this.calculateBalance();
    },
    methods: {
      async fetchConsultas() {
        try {
          const response = await axios.get('https://flow.nextcomm.tech/webhook/listar_consultas');
          this.consultas = response.data.data;
        } catch (error) {
          console.error('Erro ao buscar consultas:', error);
        }
      },
      updateBalance(amount) {
        this.totalBalance += amount;
        console.log('Balance after update:', this.totalBalance);
      },
      calculateBalance() {
        const consultas = JSON.parse(localStorage.getItem('associated_consultas')) || [];
        this.totalBalance = consultas.reduce((sum, consulta) => sum + consulta.price * 0.7, 0);
        console.log('Initial calculated balance:', this.totalBalance);
      }
    }
  }
  </script>
  
  <style>
  .dashboard-container {
    display: flex;
  }
  
  .dashboard-section {
    position: relative;
    background-color: #e0f7fa;
    min-height: 100vh;
    width: 100%;
    margin-left: 250px;
    padding: 20px;
    overflow: hidden;
  }
  
  .dashboard-section::before {
    content: "\f0f1"; 
    font-family: 'Font Awesome 5 Free';
    font-weight: 900; 
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 500px;
    color: rgba(0, 0, 0, 0.05);
    z-index: 0; 
  }
  
  .mt-5 {
    margin-top: 3rem;
  }
  </style>
  
