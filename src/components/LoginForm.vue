<template>
    <div class="login-container">
      <div class="image-container">
        <img src="@/assets/bg-login.png" alt="Login Header" class="login-image" />
      </div>
      <div class="login-box">
        <h1 class="title">Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="field">
            <label class="label">E-mail</label>
            <div class="control">
              <input v-model="email" class="input" type="email" placeholder="exemplo@exemplo.com" required />
            </div>
          </div>
          <div class="field">
            <label class="label">Senha</label>
            <div class="control">
              <input v-model="senha" class="input" type="password" placeholder="*****" required />
            </div>
          </div>
          <button type="submit" class="button is-primary is-fullwidth">Entrar</button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        senha: '',
        error: null
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('https://flow.nextcomm.tech/webhook/login_medico', {
            email: this.email,
            senha: this.senha
          });
  
          if (response.data && response.data[0].nome) {
            const nome = response.data[0].nome;
            localStorage.setItem('user_name', nome);
            this.$router.push('/dashboard');
          } else {
            this.error = 'Login bem-sucedido, mas não foi possível obter o nome do usuário.';
          }
        } catch (error) {
          this.error = 'Login falhou. Verifique suas credenciais.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  
  body {
    font-family: 'Roboto', sans-serif;
  }
  
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    background-color: #e0f7fa; 
  }
  
  .image-container {
    display: flex;
    justify-content: center;
    margin-bottom: -50px; 
  }
  
  .login-image {
    width: 200px; 
    height: auto;
  }
  
  .login-box {
    background-color: #ffffff;
    padding: 3rem 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px; 
    text-align: center;
    margin-top: 50px; 
  }
  
  .title {
    color: #004d99;
    margin-bottom: 1rem;
  }
  
  .field {
    margin-bottom: 1rem;
    text-align: left;
  }
  
  .label {
    font-weight: bold;
    color: #004d99;
  }
  
  .input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .button.is-primary {
    background-color: #32cd32;
    border-color: #32cd32;
    color: #fff;
  }
  
  .button.is-primary:hover {
    background-color: #28a745;
    border-color: #28a745;
  }
  
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>
  