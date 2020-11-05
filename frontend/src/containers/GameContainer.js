class GameContainer {
    constructor(){
        api.getGames().then(this.render)
    }
    
    
    render(games) {
      
      // Assigns DOM elements to variables
        const body = document.body;
        const nav = `
        <header class="nav">
            <ul>
                <li><a href="#" class="games-nav">Games</a></li>
                <li><a href="#" class="strategies-nav">Strategies</a></li>
                <li><a href="#" class="simulators-nav">Simulators</a></li>
            </ul>
            <a href="#" class="logo">BEAT THE HOUSE</a>
            <ul>
                <li><a href="#" class="balance-nav">$${state.user.balance}</a></li>
                <li><a href="#" class="username-nav">${state.user.username}</a></li>
                <li><a href="#" class="about-nav">About</a></li>
            </ul>
        </header>
        <section class="banner"></section>
      `;
      const balanceModal = `
      <div id="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
      </div>

      </div>
      `
      const header = document.getElementsByClassName("nav");
      const gamesHeader = document.createElement("div");
      const gamesContainer = document.createElement("div");
      const gameList = document.createElement("ul");
      // Navbar elements
      const gamesNav = document.getElementsByClassName("games-nav");
      const strategiesNav = document.getElementsByClassName("strategies-nav");
      const simulatorsNav = document.getElementsByClassName("simulators-nav");
      const logoNav = document.getElementsByClassName("logo");
      const balanceNav = document.getElementsByClassName("balance-nav");
      const usernameNav = document.getElementsByClassName("username-nav");
      const aboutNav = document.getElementsByClassName("about-nav");
      const balanceForm = document.createElement("form");

      window.addEventListener("scroll", function(){
        header[0].classList.toggle("sticky", window.scrollY > 0)
      });
      
      // Assignment
      gamesHeader.classList.add("games-header");
      gamesContainer.classList.add("game-container");
      gameList.classList.add("game-list")
      gamesHeader.innerHTML = `
      <h3>All Games</h3><br>
      `;
      
      
      // Appends elements to DOM
      body.innerHTML = ""
      body.innerHTML += nav;
      body.innerHTML += balanceModal;
      gamesContainer.append(gameList);
      body.append(gamesHeader, gamesContainer);


      // Repeated Functions
      function clearPage(title) {
        gamesHeader.childNodes[1].innerHTML = title;
        gameList.innerHTML = "";
      }

      function clearModal() {
        modal.style.display = "none";
        modal.querySelector("form").remove
      }
      
      // Renders game cards
      games.data.forEach(game => {
        let g = new Game(game.id, game.attributes.name, game.attributes.img);
        g.render();
      })


      const modal = document.getElementById("myModal");
      const span = document.getElementsByClassName("close")[0];
      

      // Adds NAVBAR Event Listeners

      gamesNav[0].addEventListener("click", function() {
        new GameContainer();
      });
      
      strategiesNav[0].addEventListener("click", function() {
        clearPage("Strategies");
        new StrategyContainer();
      });

      simulatorsNav[0].addEventListener("click", function() {
        clearPage("Simulators");
      });

      logoNav[0].addEventListener("click", function() {
        new GameContainer();
      });

      balanceNav[0].addEventListener("click", function() {
        const modalContent = document.querySelector(".modal-content");
        const balanceString = document.getElementsByClassName("balance-nav")[0].innerText.slice(1)
        const balanceFloat = parseFloat(balanceString)
        balanceForm.innerHTML = `
        <label for="balance">Balance:</label>
        <input type="number" required name="balance" min="0" value=${balanceFloat} step=".01">
        <input type="submit" value="Update Balance">
        `
        modalContent.appendChild(balanceForm)
        modal.style.display = "block";
      });

      span.addEventListener("click", function() {
        modal.style.display = "none";
      });

      usernameNav[0].addEventListener("click", function() {
        clearPage("Your Strategies");
        new UserStrategyContainer();
      });

      aboutNav[0].addEventListener("click", function() {
        clearPage("Our Mission");
      });

      window.addEventListener("click", function(event) {
          if (event.target == modal) {
            clearModal();
          }
      })
      
      balanceForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const balance = parseFloat(e.target.balance.value);
        api.updateUserBalance(state.user.id, balance);
        document.getElementsByClassName("balance-nav")[0].innerText = `$${balance}`
        clearModal();
      });

    }
  }