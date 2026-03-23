const key = import.meta.env.VITE_SUPABASE_KEY
const url = import.meta.env.VITE_SUPABASE_URL

async function inserir(nome, senha, email) {

  const res = await fetch(`${url}/rest/v1/usuarios`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      senha: senha,
      email: email
    })
  })

  console.log("status:", res.status)
}

async function procurarEP(email, password) {
    const res = await fetch(`${url}/rest/v1/usuarios?email=eq.${email}&senha=eq.${password}`, { 
      method: 'GET',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    }) 
  const data = await res.json()
  console.log(data)
  return data;
}

async function procurarEU(email, nome) {
    const res = await fetch(`${url}/rest/v1/usuarios?email=eq.${email}&nome=eq.${nome}`, { 
      method: 'GET',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    }) 
  const data = await res.json()
  console.log(data) 
  return data;
}


const botaoLogin = document.getElementById("login")
const botaoCadastrar = document.getElementById("cadastrar")
const botaoLogout = document.getElementById("logout")

if (botaoLogin) {
  botaoLogin.addEventListener("click", async () => {
    try {
      const senha = document.getElementById("password")
      const email = document.getElementById("email")
      const data = await procurarEP(email.value, senha.value);
      if (data.length > 0) {
        senha.value = ""
        email.value = "";
        alert("Login bem-sucedido!")
        localStorage.setItem("nome", data[0].nome);
        window.location.href = "/logado.html"
      } else {
        alert("Email ou senha incorretos.")
      }
    } catch (error) {
        console.error("Erro ao fazer login:", error)
    }
  })
}

if (botaoCadastrar) {
  botaoCadastrar.addEventListener("click", async () => {
    try {
      const username = document.getElementById("username");
      const senha = document.getElementById("password");
      const email = document.getElementById("email");
      
      const existe = await procurarEU(email.value, username.value);

      if (existe.length > 0) {
          alert("Usuário já existe.")
        } else {
          await inserir(username.value, senha.value, email.value);
          alert("Cadastro bem-sucedido!")
          window.location.href = "/login.html"
        }
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error)
        alert("Erro ao cadastrar usuário. Por favor, tente novamente.")
      }
  })
}


if (botaoLogout) {
  botaoLogout.addEventListener("click", () => {
    localStorage.removeItem("nome");
    window.location.href = "/login.html"
  })
}

const logadoTitulo = document.querySelector(".logadoTitulo")

if (logadoTitulo) {
  const nome = localStorage.getItem("nome");
  
  logadoTitulo.textContent = `Bem-vindo, você está logado ${nome}!`
}


