<template>
    <div class="minhas-consultas-container">
      <SidebarSapia :totalBalance="totalBalance" />
      <section class="section minhas-consultas-section">
        <div class="container mt-5">
        <h1 class="title">Minhas Consultas</h1>
          <div class="columns is-multiline">
            <div class="column is-one-third" v-for="consulta in minhasConsultas" :key="consulta.consulta_id">
              <ConsultaCardMinhas 
                :doctor="consulta.nome_paciente" 
                :details="consulta.status_agenda" 
                :price="consulta.valor_pagamento"
                :consultaId="consulta.consulta_id"
                :videoLink="consulta.video_link"
                @consultaCancelada="updateBalance"
                @consultaSelecionada="showConsultaDetails"
              />
            </div>
          </div>
          <div class="modal" :class="{ 'is-active': isModalActive }">
            <div class="modal-background" @click="closeModal"></div>
            <div class="modal-content">
              <div class="box">
                <h3 class="title is-4">Detalhes da Consulta</h3>
                <p><strong>Paciente: {{ selectedConsulta?.nome_paciente }}</strong></p>
                <p><strong>Status: {{ selectedConsulta?.status_agenda }}</strong></p>
                <p><strong>Valor Total: R$ {{ selectedConsulta?.valor_pagamento }}</strong></p>
                <p>Início: {{ selectedConsulta?.inicio_consulta }}</p>
                <p>Fim: {{ selectedConsulta?.fim_consulta }}</p>
              </div>
            </div>
            <button class="modal-close is-large" @click="closeModal"></button>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import SidebarSapia from '@/components/SidebarSapia.vue';
  import ConsultaCardMinhas from '@/components/ConsultaCardMinhas.vue';
  
  export default {
    components: {
      SidebarSapia,
      ConsultaCardMinhas
    },
    data() {
      return {
        minhasConsultas: [],
        isModalActive: false,
        selectedConsulta: null,
        totalBalance: 0
      }
    },
    mounted() {
      this.fetchMinhasConsultas();
      this.calculateBalance();
    },
    methods: {
      async fetchMinhasConsultas() {
        const medicoResponsavel = localStorage.getItem('user_name');
        try {
          const response = await axios.get('https://flow.nextcomm.tech/webhook/listar_minhas_consultas', {
            params: { medico_responsavel: medicoResponsavel }
          });
          this.minhasConsultas = response.data.data;
          console.log(this.minhasConsultas);
        } catch (error) {
          console.error('Erro ao buscar consultas:', error);
        }
      },
      showConsultaDetails(consulta) {
        this.selectedConsulta = consulta;
        this.isModalActive = true;
      },
      closeModal() {
        this.isModalActive = false;
      },
      updateBalance(amount) {
        this.totalBalance -= amount;
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
  .minhas-consultas-container {
    display: flex;
  }
  
  .minhas-consultas-section {
    position: relative;
    background-color: #e0f7fa; 
    min-height: 100vh;
    width: 100%;
    margin-left: 250px; 
    padding: 20px;
    overflow: hidden; 
  }
  
  .minhas-consultas-section::before {
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
  
  .modal-content {
    max-width: 500px;
    margin: auto;
  }
  </style>
  