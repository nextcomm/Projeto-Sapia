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
      <button class="button is-info" @click="consultarConsulta">Consultar</button>
      <button class="button is-danger" @click.stop="cancelarConsulta">Desassociar</button>
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
    consultaId: String,
    videoLink: String
  },
  methods: {
    consultarConsulta() {
      window.open(`https://${this.videoLink}`, '_blank');
    },
    async cancelarConsulta() {
      try {
        const medicoResponsavel = localStorage.getItem('user_name');
        const response = await axios.put('https://flow.nextcomm.tech/webhook/remove_medico', {
          consulta_id: this.consultaId,
          medico_nome: medicoResponsavel
        });
        if (response) {
          alert('Consulta cancelada com sucesso!');
          let consultas = JSON.parse(localStorage.getItem('associated_consultas')) || [];
          consultas = consultas.filter(consulta => consulta.consultaId !== this.consultaId);
          localStorage.setItem('associated_consultas', JSON.stringify(consultas));
          this.$emit('consultaCancelada', this.price * 0.7);
          this.$router.push('/dashboard');
        }
      } catch (error) {
        alert('Erro ao cancelar consulta.');
        console.error('Erro ao cancelar consulta:', error);
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
  justify-content: space-between;
  width: 100%;
  margin-top: -1px;
}

.button.is-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
  width: 48%;
  border-radius: 0;
}

.button.is-info:hover {
  background-color: #138496;
  border-color: #138496;
}

.button.is-danger {
  background-color: #ff3860;
  border-color: #ff3860;
  color: white;
  width: 48%;
  border-radius: 0;
}

.button.is-danger:hover {
  background-color: #ff1e45;
  border-color: #ff1e45;
}

@media (max-width: 768px) {
  .card-footer-actions {
    flex-direction: column;
  }
  .button.is-info, .button.is-danger {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
