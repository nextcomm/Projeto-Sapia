<template>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <i class="fa-solid fa-hospital-user"></i> {{ doctor }}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <p>{{ details }}</p>
        </div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
            <i class="fas fa-dollar-sign"></i> R$ {{ (price * 0.7).toFixed(2) }}
          </span>
        </p>
      </footer>
      <div class="card-footer-actions">
        <button class="button is-success" @click.stop="associateConsultation">Associar</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      doctor: String,
      details: String,
      price: Number,
      consultaId: String
    },
    methods: {
      async associateConsultation() {
        const medicoResponsavel = localStorage.getItem('user_name');
        try {
          const response = await axios.put('https://flow.nextcomm.tech/webhook/atualiza_medico', {
            consulta_id: this.consultaId,
            medico_nome: medicoResponsavel
          });
          if (response) {
            alert('Consulta associada com sucesso!');
            const consulta = {
              consultaId: this.consultaId,
              doctor: this.doctor,
              details: this.details,
              price: this.price
            };
            let consultas = JSON.parse(localStorage.getItem('associated_consultas')) || [];
            consultas.push(consulta);
            localStorage.setItem('associated_consultas', JSON.stringify(consultas));
            this.$emit('consultaAssociada', this.price * 0.7);
            this.$router.push('/minhas-consultas');
          }
        } catch (error) {
          alert('Erro ao associar consulta.');
          console.error('Erro ao associar consulta:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    margin-bottom: 20px;
    transition: transform 0.2s;
    background-color: #ffffff;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .card-header {
    background-color: #004d99;
    color: #ffffff;
  }
  
  .card-footer {
    border: none;
    padding: 0;
  }
  
  .card-footer-item {
    color: #32cd32;
  }
  
  .card-footer-actions {
    display: flex;
    width: 100%;
    margin-top: -1px;
  }
  
  .button.is-success {
    background-color: #32cd32;
    border-color: #32cd32;
    color: white;
    width: 100%;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  
  .button.is-success:hover {
    background-color: #28a745;
    border-color: #28a745;
  }
  
  @media (max-width: 768px) {
    .card-footer-actions {
      flex-direction: column;
    }
    .button.is-success {
      width: 100%;
    }
  }
  </style>
  
