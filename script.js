document.addEventListener("DOMContentLoaded", function () {
  const slide2 = document.getElementById("slide2");
  const slide3 = document.getElementById("slide3");
  const slide5 = document.getElementById("slide5");
  const slide6 = document.getElementById("slide6");
  const slide7 = document.getElementById("slide7");
  const slide8 = document.getElementById("slide8");
  const slide9 = document.getElementById("slide9");
  const nextButton = document.getElementById("nextButton"); // Supondo que haja um botão com o ID 'nextButton'

  // Habilita o botão "nextButton" após 5 segundos
  setTimeout(() => {
    nextButton.disabled = false; // Remove o atributo "disabled"
    nextButton.style.cursor = "pointer"; // Atualiza o estilo do cursor
  }, 15000);

  // Adicionar funcionalidade ao botão para ir para a próxima página
  nextButton.addEventListener("click", function () {
    window.location.href = "slide2.html";
  });

  slide3.addEventListener("click", function () {
    window.location.href = "slide3.html";
  });

  slide5.addEventListener("click", function () {
    window.location.href = "slide5.html";
  });

  slide6.addEventListener("click", function () {
    window.location.href = "slide6.html";
  });

  slide7.addEventListener("click", function () {
    window.location.href = "slide7.html";
  });

  slide8.addEventListener("click", function () {
    window.location.href = "slide8.html";
  });

  slide9.addEventListener("click", function () {
    window.location.href = "slide9.html";
  });
});
