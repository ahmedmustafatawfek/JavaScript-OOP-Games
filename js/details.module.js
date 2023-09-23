import { Ui } from "./ui.module.js";

export class Details {
  constructor(idGames) {
    document.getElementById("btnClose").addEventListener("click", () => {
      document.getElementById("details").classList.add("d-none");
      document.getElementById("games").classList.remove("d-none");
    });

    this.loader = document.querySelector(".loading");
    this.getDetails(idGames);
  }

  async getDetails(idGames) {
    this.loader.classList.remove("d-none");

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`,
      options
    );
    const response = await api.json();

    this.loader.classList.add("d-none");

    new Ui().displayDetails(response);
  }
}
