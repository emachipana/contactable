// REVISAR COMENTARIOS
import { login } from "../services/sessions-service.js";
import DOMHandler from "../dom-handler.js";
import { input  } from "../components/input.js";
import STORE from "../store.js";
import HomePage from "./homepage.js";

function render() {

  const { loginError } = LoginPage.state;
  return `
    <main class="session-container">
        <h1 class="session__title">Login</h1>
        <hr class="hr">
        <form class="session__form">
          <div class="form__input-container">
            ${input({
              type: "email",
              placeholder: "example@gmail.com",
              required: true,
              value: "team01@mail.com" // quitar el value al final
            })}

            ${input({
              type: "password",
              placeholder: "******",
              required: true,
              value: "123456" // quitar el value al final
            })}

            ${loginError ? 
              `<p class="text-center error-300">${loginError}</p>`: ''
            }
          </div>
          <div class="session__buttons">
            <hr class="hr">
            <a href="#" class="button__link">Signup</a>
            <button class="button__link" type="submit">Login</button>
          </div>
        </form>
    </main>
  `;
}

function listenSubmitForm() {
  const form =  document.querySelector(".session__form")

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
  
      const { email, password } = event.target;
  
      const credentials = {
        email: email.value,
        password: password.value,
      }
  
      const user = await login(credentials)
      STORE.user = user
      // console.log(STORE)

      await STORE.filterContacts()
      DOMHandler.load(HomePage)
    } catch (error) {
      // this.state.loginError = error.message
      LoginPage.state.loginError = error.message
      DOMHandler.reload()
    }
  })
}

const LoginPage = {
  toString() {
    // return render.call(this)
    return render()
  },
  addListeners() {
    // listenSubmitForm.call(this)
    return listenSubmitForm()
  },
  state: {
    loginError: null,
  }
}

export default LoginPage