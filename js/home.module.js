import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Home {
  // CONSTRACTOR
  constructor() {
    let links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        this.changeActiveLink(link);

        const category = link.getAttribute("data-category");
        this.getGames(category);
      });
    });

    this.loader = document.querySelector(".loading");
    this.games = document.getElementById("games");
    this.details = document.getElementById("details");

   
    this.ui = new Ui();
    this.getGames("MMORPG");
  }

  //CHANGE ACTIVE LINK
  changeActiveLink(link) {
    document.querySelector(".navbar-nav .active").classList.remove("active");
    link.classList.add("active");
  }

  //GET GAMES DATA
  async getGames(category) {
    this.loader.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    const response = await api.json();
    this.loader.classList.add("d-none");

    this.ui.displayGames(response);
    let cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        this.games.classList.add("d-none");
        this.details.classList.remove("d-none");

       const detailsSection = new Details(card.getAttribute("data-id"));
      });
    });
  }
}
